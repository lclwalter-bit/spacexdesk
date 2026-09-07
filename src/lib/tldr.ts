import { flights } from '../data/flights'
import { newsItems } from '../data/news'
import { shareholder } from '../data/shareholder'
import { unlocks } from '../data/unlocks'
import { daysUntilIso, nyClock, type NyClock } from './nyTime'
import type { Stance } from './stance'

export type { Stance }

export type TldrPrint = {
  session: string
  stance: Stance
  lede: string
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
      action: `Stand aside until ${wait}. The setup is a patient entry into ${next.label} (${next.pctOutstanding}% of outstanding). Ignore today’s tape and look for Aug 20-style absorption (low $130.39 / close $134), not a chase.`,
    }
  }
  if (next && days != null && days <= 0) {
    return {
      focus: `${shortDate(next.date)} ${next.label}`,
      action: `Today is the print. Stay flat into the open. The read is close and volume versus Aug 20, not the first tick. Eligibility is not a forced sale.`,
    }
  }
  if (f14) {
    return {
      focus: `${f14.id} NET ${shortDate(f14.netDate)}`,
      action: `No unlock in the near window. The next setup is ${f14.id}. Wait for a clean operations print rather than manufacturing a trade.`,
    }
  }
  return {
    focus: 'Desk',
    action: 'No timed setup. Stay patient until the next unlock or Flight 14 is the focus.',
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
  const sentences: string[] = []

  if (days != null && days <= 3 && next) {
    score -= 1
    const when =
      days <= 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} sessions`
    sentences.push(
      `${next.label} prints ${when}. The ${next.pctOutstanding}% tranche matches Aug 20 in size — a supply test, not a thesis change.`,
    )
  } else if (days != null && days <= 10 && next) {
    sentences.push(
      `Next supply is ${shortDate(next.date)}: ${next.label} at ${next.pctOutstanding}% of outstanding.`,
    )
  }

  if (chg != null && chg <= -0.015) {
    score -= 1
    sentences.push(`The tape is ${(chg * 100).toFixed(1)}% versus the prior close.`)
  } else if (chg != null && chg >= 0.015) {
    score += 1
    sentences.push(`The tape is +${(chg * 100).toFixed(1)}% versus the prior close.`)
  }

  if (vsIpo != null && vsIpo >= 0.03) {
    score += 1
    sentences.push(`SPCX remains +${(vsIpo * 100).toFixed(1)}% versus the $135 IPO.`)
  } else if (vsIpo != null && vsIpo <= -0.05) {
    score -= 1
    sentences.push(`SPCX is ${(vsIpo * 100).toFixed(1)}% versus the $135 IPO.`)
  }

  if (f14) {
    sentences.push(
      `Flight 14, NET ${shortDate(f14.netDate)}, is the operations bid after this supply is absorbed.`,
    )
  }

  if (news?.tags.includes('unlock') || news?.tags.includes('macro')) {
    sentences.push(`${news.title}.`)
  }

  const stance: Stance = score >= 1 ? 'Bullish' : score <= -1 ? 'Bearish' : 'Stagnant'
  const lede =
    sentences.slice(0, 3).join(' ') ||
    'The desk is waiting on the next unlock and Flight 14.'
  const { action, focus } = buildAction(days, next, f14)

  return { stance, lede, action, focus }
}
