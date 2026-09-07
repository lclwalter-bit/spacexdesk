export const shareholder = {
  ticker: 'SPCX',
  name: 'Space Exploration Technologies Corp',
  ipoDate: '2026-06-12',
  ipoPrice: 135,
  sharesOutstandingB: 13.18,
  muskSharesB: 6.42,
  muskLockUntil: '2027-06-12',
  segments: [
    {
      name: 'Connectivity (Starlink)',
      q2RevB: 4.29,
      note: 'Only profitable segment in Q2 — op. income ~$1.66B; ~12M subs.',
    },
    {
      name: 'AI',
      q2RevB: 2.56,
      note: 'Hyperscaler / orbital compute build; op. loss ~$1.26B. Starmind + NVDA Vera Rubin path.',
    },
    {
      name: 'Space (launch)',
      q2RevB: 0.962,
      note: 'Starship R&D heavy; op. loss ~$542M. Falcon cadence still cash engine.',
    },
  ],
  q2: {
    revenueB: 7.81,
    yoy: 0.92,
    netLossM: 541,
    muskARR: 'Musk: ~$100B annualized revenue run-rate by end-2026 (earnings call).',
  },
  floatNotes: [
    'Staggered unlocks (~2.4–2.5% calendar) until Q3 cliff — default climb bias if sell-through stays light.',
    'Q3+2d ~1.3B (~9.9%) is the real 2026 supply cliff — keep dry powder.',
    'Eligibility ≠ sell-through. Watch volume and close, not just the open tick.',
  ],
}
