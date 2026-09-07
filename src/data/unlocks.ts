import type { Stance } from '../lib/stance'

export type UnlockEvent = {
  date: string
  label: string
  sharesM: number
  pctOutstanding: number
  status: 'done' | 'next' | 'upcoming'
  note: string
  stance: Stance
}

/** Approx shares outstanding ~13.18B as of early Sep 2026 */
export const SHARES_OUTSTANDING_B = 13.18

export const unlocks: UnlockEvent[] = [
  {
    date: '2026-06-12',
    label: 'IPO float',
    sharesM: 639,
    pctOutstanding: 4.85,
    status: 'done',
    note: 'IPO at $135. Peak ~$226, low ~$105.',
    stance: 'Stagnant',
  },
  {
    date: '2026-08-06',
    label: 'Unlock #1 (post-Q2)',
    sharesM: 911.5,
    pctOutstanding: 6.91,
    status: 'done',
    note: 'Light sell-through; flushed toward ~$105 then squeeze. Conditional +455.8M did not release.',
    stance: 'Stagnant',
  },
  {
    date: '2026-08-20',
    label: 'Unlock #2 (day 70)',
    sharesM: 319,
    pctOutstanding: 2.42,
    status: 'done',
    note: 'Intraday low $130.39, close $134. Typical ~2.4% calendar tranche.',
    stance: 'Stagnant',
  },
  {
    date: '2026-09-09',
    label: 'Unlock #3 (day 90)',
    sharesM: 319,
    pctOutstanding: 2.42,
    status: 'next',
    note: 'Same size as Aug 20. Eligibility at Nasdaq open — not a forced sale.',
    stance: 'Bearish',
  },
  {
    date: '2026-09-10',
    label: 'Affiliate block (day 91)',
    sharesM: 59.1,
    pctOutstanding: 0.45,
    status: 'upcoming',
    note: 'Rule 144 affiliate / early standoff release.',
    stance: 'Stagnant',
  },
  {
    date: '2026-09-24',
    label: 'Calendar tranche',
    sharesM: 328.4,
    pctOutstanding: 2.49,
    status: 'upcoming',
    note: 'Continues staggered ~2.5% cadence.',
    stance: 'Stagnant',
  },
  {
    date: '2026-10-09',
    label: 'Calendar tranche',
    sharesM: 328.4,
    pctOutstanding: 2.49,
    status: 'upcoming',
    note: 'Pre-Q3 supply ladder.',
    stance: 'Stagnant',
  },
  {
    date: '2026-10-24',
    label: 'Calendar tranche',
    sharesM: 328.4,
    pctOutstanding: 2.49,
    status: 'upcoming',
    note: 'Last ~2.5% calendar print before Q3 cliff.',
    stance: 'Stagnant',
  },
  {
    date: '2026-11-05',
    label: 'Q3 + 2 RTH cliff',
    sharesM: 1300,
    pctOutstanding: 9.86,
    status: 'upcoming',
    note: '~28% of 180-day block. Date approx — keyed to Q3 earnings + 2 trading days. Largest 2026 supply event.',
    stance: 'Bearish',
  },
  {
    date: '2026-12-08',
    label: '180-day residual',
    sharesM: 797.6,
    pctOutstanding: 6.05,
    status: 'upcoming',
    note: 'Includes rolled conditional tranche that missed $175.50 trigger.',
    stance: 'Bearish',
  },
  {
    date: '2027-06-12',
    label: 'Musk lock ends',
    sharesM: 6420,
    pctOutstanding: 48.7,
    status: 'upcoming',
    note: 'Elon ~6.4B shares locked to ~IPO+1y. No early-release provision in prospectus.',
    stance: 'Bearish',
  },
]

export function notionalAt(price: number, sharesM: number) {
  return sharesM * 1e6 * price
}
