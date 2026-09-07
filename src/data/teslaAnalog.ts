import type { Stance } from '../lib/stance'

/** Tesla analog for SPCX supply events. Prices unadjusted unless noted. */
export const TSLA_SHARES_B = 3.22

export type AnalogRow = {
  analog: string
  tesla: string
  spcx: string
  read: string
  stance: Stance
}

export const analogRows: AnalogRow[] = [
  {
    analog: 'IPO print',
    tesla: '2010-06-29 @ $17. First day +40.5%. Six-month range $14.98–$36.42 on a ~$2B cap.',
    spcx: '2026-06-12 @ $135. Peak ~$226, low ~$105. Already Tesla-peak scale (~$2T).',
    read: 'Do not apply Tesla’s IPO→peak multiple. SPCX already listed as a mega-cap. Use event behavior and sales multiple, not 2010-style 100x.',
    stance: 'Stagnant',
  },
  {
    analog: 'First supply digestion',
    tesla: 'Thin IPO float; little staggered unlock. Volatility was the float, not a calendar.',
    spcx: 'Unlock #1 2026-08-06 (~6.9%): flushed toward $105 then squeezed. Conditional +455.8M did not release.',
    read: 'SPCX already printed Tesla-like air-pocket volatility — compressed into weeks, not years.',
    stance: 'Stagnant',
  },
  {
    analog: 'Repeatable ~2.4% tranche',
    tesla: 'No Tesla analog. Tesla did not drip 2–3% calendar unlocks.',
    spcx: 'Unlock #2 2026-08-20: 319M (2.42%), low $130.39, close $134. Same size as Sep 9.',
    read: 'Sep 9 rhymes with Aug 20, not with Tesla’s 180-day. Eligibility ≠ forced sale.',
    stance: 'Stagnant',
  },
  {
    analog: '180-day / founder cliff',
    tesla: '2010-12-27 lockup day: −15.1% to $25.55. ~75M of ~93M SO became eligible (~80%).',
    spcx: 'Sep 9 is 2.42%. True Tesla-scale supply is later: Q3+2d ~9.9% (Nov) then Musk ~48.7% (2027-06-12).',
    read: 'Tesla’s −15% was an 80% SO event. Linear-scale that onto 2.4% and it is noise. Save dry powder for Nov and 2027, not Sep 9.',
    stance: 'Bearish',
  },
  {
    analog: 'Product re-rate',
    tesla: 'Model S 2012 was late; the violent bid was Q1’13 first profit (multi-bagger in months). Cars were the product.',
    spcx: 'Flight 14 / Starlink V3 + Musk ~$100B ARR by end-2026. Launch + connectivity + orbital compute.',
    read: 'If the product stack is larger than cars, Tesla’s re-rate is the floor for how ops can re-price the multiple — after supply is absorbed, not during it.',
    stance: 'Bullish',
  },
]

export const nextMilestone = {
  date: '2026-09-09',
  label: 'Unlock #3 (day 90)',
  sharesM: 319,
  pctOutstanding: 2.42,
  stance: 'Bearish' as Stance,
  localAnalog: 'Aug 20 Unlock #2 — same 319M / 2.42%. Intraday low $130.39, cash close $134.',
  teslaAnalog:
    'Dec 27 2010 lockup: −15% close $25.55 when ~80% of shares became eligible. Wrong scale for a 2.4% calendar print.',
  playbook:
    'Treat Sep 9 as an absorption test, not a thesis change. Watch volume and the close vs $130–$135, same as Aug 20. Ignore the open tick. The growth argument is Flight 14 / ARR catch-up vs the Nov ~9.9% cliff — not this tranche.',
}

/** Tesla-at-scale sales multiple ~10–15x; 2020–21 peak stretch ~25–40x forward. */
export const teslaSalesMultiple = {
  mature: 12,
  peak: 28,
  magnitudePremium: 1.5,
}

export const muskArrB = 100
export const q2AnnualizedB = 7.81 * 4

export const scenarioStances = {
  runRate: 'Stagnant',
  arr: 'Bullish',
  magnitude: 'Bullish',
} as const satisfies Record<string, Stance>
