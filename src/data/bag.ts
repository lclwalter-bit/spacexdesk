import type { Stance } from '../lib/stance'
import { fmtMoney } from '../lib/yahoo'

export type BagRung = {
  price: number
  pct: number
  label: string
  note: string
  stance: Stance
}

/**
 * How much of the bag to put on as the tape comes in.
 * $145 = 20% starter. $135 IPO = full bag.
 */
export const bagLadder: BagRung[] = [
  {
    price: 145,
    pct: 20,
    label: 'Starter',
    note: 'First clip. Not a chase from above here.',
    stance: 'Stagnant',
  },
  {
    price: 140,
    pct: 50,
    label: 'Half bag',
    note: 'Add on the way to the IPO print.',
    stance: 'Stagnant',
  },
  {
    price: 135,
    pct: 100,
    label: 'Full bag',
    note: 'IPO print. This is the full size.',
    stance: 'Bullish',
  },
]

export function bagDeployed(last: number | null): number {
  if (last == null || !Number.isFinite(last)) return 0
  let pct = 0
  for (const rung of bagLadder) {
    if (last <= rung.price) pct = rung.pct
  }
  return pct
}

export function bagHeadline(last: number | null): string {
  const px = last != null && Number.isFinite(last) ? last : null
  const pct = bagDeployed(px)
  if (px == null) {
    return 'Scale the bag as the tape comes in. $145 is a 20% starter. $135 is a full bag.'
  }
  if (pct <= 0) {
    return `Tape ${fmtMoney(px)} is above the starter. Wait for $145 to put 20% on. $135 is the full bag.`
  }
  if (pct < 100) {
    return `Tape ${fmtMoney(px)} is a ${pct}% clip. Add toward a full bag at $135.`
  }
  return `Tape ${fmtMoney(px)} is at or under the IPO print. This is a full bag.`
}
