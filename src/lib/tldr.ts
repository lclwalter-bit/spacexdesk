import { flights } from '../data/flights'
import { newsItems } from '../data/news'
import { shareholder } from '../data/shareholder'
import { unlocks } from '../data/unlocks'
import { daysUntilIso, nyClock, type NyClock } from './nyTime'

export type Stance = 'Bullish' | 'Bearish' | 'Stagnant'

export type TldrPrint = {
  session: string
  stance: Stance
  because: string
  action: string
  focus: string
  preview: boolean
}

function shortDate(iso: string) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  const [, m, d] = iso.split('-')
  return `${Number(d)} ${months[Number(m) - 1]}`
}

function buildAction(
  days: number | null,
  next: (typeof unlocks)[number] | undefined,
  f14: (typeof flights)[number] | undefined,
) {
  if (next && days != null && days > 0) {
    const wait = days === 1 ? 'tomorrow' : shortDate(next.date)
    return {
      focus: `${shortDate(next.date)} ${next.label}`,
      action: `Sit out until ${wait}. Next trade is a patient entry into ${next.label} (${next.pctOutstanding}% SO) — ignore today's tape. Hunt an Aug 20-style absorption (low $130.39 / close $134), not a chase.`,
    }
  }
  if (next && days != null && days <= 0) {
    return {
      focus: `${shortDate(next.date)} ${next.label}`,
      action: `Today is the print. Stay flat into the open; the trade is close/volume vs Aug 20, not fading the first tick. Eligibility ≠ forced sale.`,
    }
  }
  if (f14) {
    return {
      focus: `${f14.id} NET ${shortDate(f14.netDate)}`,
      action: `No unlock in the near window. Next setup is ${f14.id} — wait for a clean ops print, don't manufacture a trade.`,
    }
  }
  return {
    focus: 'Desk',
    action: 'No timed setup. Stay patient until the next unlock or Flight 14 date is the focus.',
  }
}

export function buildTldr(
  price: number | null,
  previousClose: number | null,
  clock: NyClock = nyClock(),
): Omit<TldrPrint, 'session' | 'preview'> {
  const next = unlocks.find((u) => u.status === 'next')
  const days = next ? daysUntilIso(next.date, clock.dateStr) : null
  const px = price
  const prev = previousClose
  const chg = px != null && prev ? (px - prev) / prev : null
  const vsIpo =
    px != null ? (px - shareholder.ipoPrice) / shareholder.ipoPrice : null
  const f14 = flights.find((f) => f.status === 'target')
  const news = newsItems[0]

  let score = 0
  const bits: string[] = []

  if (days != null && days <= 3 && next) {
    score -= 1
    const when =
      days <= 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} sessions`
    bits.push(
      `${next.label} ${when} (${next.pctOutstanding}% SO, same size as Aug 20) is a supply test, not a thesis change`,
    )
  } else if (days != null && days <= 10 && next) {
    bits.push(`next supply ${next.date} (${next.pctOutstanding}% SO)`)
  }

  if (chg != null && chg <= -0.015) {
    score -= 1
    bits.push(`tape ${(chg * 100).toFixed(1)}% vs prior close`)
  } else if (chg != null && chg >= 0.015) {
    score += 1
    bits.push(`tape +${(chg * 100).toFixed(1)}% vs prior close`)
  }

  if (vsIpo != null && vsIpo >= 0.03) {
    score += 1
    bits.push(`still +${(vsIpo * 100).toFixed(1)}% vs IPO $135`)
  } else if (vsIpo != null && vsIpo <= -0.05) {
    score -= 1
    bits.push(`${(vsIpo * 100).toFixed(1)}% vs IPO $135`)
  }

  if (f14) {
    bits.push(`${f14.id} NET ${f14.netDate} is the ops bid after this supply`)
  }

  if (news?.tags.includes('unlock') || news?.tags.includes('macro')) {
    bits.push(`${news.outlet}: ${news.title}`)
  }

  const stance: Stance = score >= 1 ? 'Bullish' : score <= -1 ? 'Bearish' : 'Stagnant'
  const because =
    bits.slice(0, 3).join('; ') ||
    'desk is waiting on the next unlock, Flight 14, and the Yahoo tape'
  const { action, focus } = buildAction(days, next, f14)

  return { stance, because, action, focus }
}
