export type Quote = {
  symbol: string
  price: number
  previousClose: number
  open: number | null
  dayHigh: number | null
  dayLow: number | null
  volume: number | null
  marketState: string
  preMarketPrice: number | null
  postMarketPrice: number | null
  currency: string
  exchangeName: string
  regularMarketTime: number | null
}

export type Candle = {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

function apiBase() {
  return '/api/yahoo'
}

function lastFinite(values: Array<number | null | undefined> | undefined): number | null {
  if (!values) return null
  for (let i = values.length - 1; i >= 0; i--) {
    const v = values[i]
    if (v != null && Number.isFinite(Number(v))) return Number(v)
  }
  return null
}

type YahooMeta = {
  symbol?: string
  marketState?: string
  regularMarketPrice?: number | null
  preMarketPrice?: number | null
  postMarketPrice?: number | null
  chartPreviousClose?: number | null
  previousClose?: number | null
  regularMarketOpen?: number | null
  regularMarketDayHigh?: number | null
  regularMarketDayLow?: number | null
  regularMarketVolume?: number | null
  currency?: string
  exchangeName?: string
  regularMarketTime?: number | null
}

function liveTapePrice(meta: YahooMeta, lastBarClose: number | null): number {
  const state = String(meta.marketState ?? '').toUpperCase()
  const pre = meta.preMarketPrice != null ? Number(meta.preMarketPrice) : null
  const post = meta.postMarketPrice != null ? Number(meta.postMarketPrice) : null
  const rth = meta.regularMarketPrice != null ? Number(meta.regularMarketPrice) : null
  const prev = Number(meta.chartPreviousClose ?? meta.previousClose)

  const raw =
    lastBarClose ??
    (state.includes('PRE') && pre != null
      ? pre
      : (state.includes('POST') || state.includes('AFTER')) && post != null
        ? post
        : (rth ?? pre ?? post ?? prev))
  return Math.round(Number(raw) * 100) / 100
}

function changeBasis(meta: YahooMeta, live: number): number {
  const state = String(meta.marketState ?? '').toUpperCase()
  const rth = meta.regularMarketPrice != null ? Number(meta.regularMarketPrice) : null
  const prev = Number(meta.chartPreviousClose ?? meta.previousClose)
  const vsLastRth =
    state.includes('PRE') ||
    state.includes('POST') ||
    state.includes('AFTER') ||
    state.includes('CLOSED')
  if (vsLastRth && rth != null && Number.isFinite(rth) && Math.abs(rth - live) > 0.0001) {
    return rth
  }
  return prev
}

/** Keep the last candle on the live tape so the chart last-value matches the quote. */
export function patchLastCandle(rows: Candle[], livePrice?: number | null): Candle[] {
  if (livePrice == null || !rows.length || !Number.isFinite(livePrice)) return rows
  const px = Math.round(livePrice * 100) / 100
  const last = rows[rows.length - 1]
  if (Math.abs(last.close - px) < 0.0005) return rows
  const next = rows.slice()
  next[next.length - 1] = {
    ...last,
    close: px,
    high: Math.max(last.high, px),
    low: Math.min(last.low, px),
  }
  return next
}

export async function fetchQuote(symbol = 'SPCX'): Promise<Quote> {
  const url = `${apiBase()}/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1m&range=1d&includePrePost=true`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`quote ${res.status}`)
  const json = await res.json()
  const result = json?.chart?.result?.[0]
  if (!result) throw new Error('no chart result')
  const meta = (result.meta ?? {}) as YahooMeta
  const lastBarClose = lastFinite(result.indicators?.quote?.[0]?.close)
  const price = liveTapePrice(meta, lastBarClose)
  return {
    symbol: meta.symbol ?? symbol,
    price,
    previousClose: changeBasis(meta, price),
    open: meta.regularMarketOpen ?? null,
    dayHigh: meta.regularMarketDayHigh ?? null,
    dayLow: meta.regularMarketDayLow ?? null,
    volume: meta.regularMarketVolume ?? null,
    marketState: meta.marketState ?? 'UNKNOWN',
    preMarketPrice: meta.preMarketPrice ?? null,
    postMarketPrice: meta.postMarketPrice ?? null,
    currency: meta.currency ?? 'USD',
    exchangeName: meta.exchangeName ?? 'NMS',
    regularMarketTime: meta.regularMarketTime ?? null,
  }
}

export async function fetchCandles(
  symbol = 'SPCX',
  range = '5d',
  interval = '15m',
): Promise<Candle[]> {
  const url = `${apiBase()}/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}&includePrePost=true`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`candles ${res.status}`)
  const json = await res.json()
  const result = json?.chart?.result?.[0]
  if (!result) return []
  const ts: number[] = result.timestamp || []
  const q = result.indicators?.quote?.[0] || {}
  const out: Candle[] = []
  for (let i = 0; i < ts.length; i++) {
    const o = q.open?.[i]
    const h = q.high?.[i]
    const l = q.low?.[i]
    const c = q.close?.[i]
    if (o == null || h == null || l == null || c == null) continue
    out.push({
      time: ts[i],
      open: o,
      high: h,
      low: l,
      close: c,
      volume: q.volume?.[i] ?? 0,
    })
  }
  return out
}

export function fmtMoney(n: number, digits = 2) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export function fmtCompact(n: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(n)
}

export function sessionLabel(state: string) {
  const s = (state || '').toUpperCase()
  if (s.includes('PRE')) return 'PRE-MARKET'
  if (s.includes('POST') || s.includes('AFTER')) return 'AFTER-HOURS'
  if (s.includes('REGULAR')) return 'RTH'
  if (s.includes('CLOSED')) return 'CLOSED'
  // Yahoo sometimes omits marketState outside US hours — infer from clock (ET)
  const et = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }))
  const mins = et.getHours() * 60 + et.getMinutes()
  const day = et.getDay()
  if (day === 0 || day === 6) return 'WEEKEND'
  if (mins >= 4 * 60 && mins < 9 * 60 + 30) return 'PRE-MARKET'
  if (mins >= 9 * 60 + 30 && mins < 16 * 60) return 'RTH'
  if (mins >= 16 * 60 && mins < 20 * 60) return 'AFTER-HOURS'
  return 'CLOSED'
}
