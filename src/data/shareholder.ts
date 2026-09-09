import type { Stance } from '../lib/stance'

export const shareholder = {
  ticker: 'SPCX',
  name: 'Space Exploration Technologies Corp',
  ipoDate: '2026-06-12',
  ipoPrice: 135,
  sharesOutstandingB: 13.18,
  muskSharesB: 6.42,
  muskLockUntil: '2027-06-12',
  muskLockStance: 'Bearish' as Stance,
  q2Stance: 'Bullish' as Stance,
  segments: [
    {
      name: 'Connectivity (Starlink)',
      q2RevB: 4.29,
      note: 'Only profitable segment in Q2 — op. income ~$1.66B; ~12M subs.',
      stance: 'Bullish' as Stance,
    },
    {
      name: 'AI',
      q2RevB: 2.56,
      note: 'Hyperscaler / orbital compute build; op. loss ~$1.26B. Starmind + NVDA Vera Rubin path.',
      stance: 'Stagnant' as Stance,
    },
    {
      name: 'Space (launch)',
      q2RevB: 0.962,
      note: 'Starship R&D heavy; op. loss ~$542M. Falcon cadence still cash engine.',
      stance: 'Stagnant' as Stance,
    },
  ],
  q2: {
    revenueB: 7.81,
    yoy: 0.92,
    netLossM: 541,
    muskARR: 'Musk: ~$100B annualized revenue run-rate by end-2026 (earnings call).',
    arrStance: 'Bullish' as Stance,
  },
  floatNotes: [
    {
      text: 'Staggered unlocks (~2.4–2.5% calendar) until Q3 cliff — default climb bias if sell-through stays light.',
      stance: 'Bullish' as Stance,
    },
    {
      text: 'Q3+2d ~1.3B (~9.9%) is the real 2026 supply cliff — keep dry powder.',
      stance: 'Bearish' as Stance,
    },
    {
      text: 'Eligibility ≠ sell-through. Watch volume and close, not just the open tick.',
      stance: 'Stagnant' as Stance,
    },
  ],
}
