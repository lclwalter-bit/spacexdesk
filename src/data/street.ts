export type StreetTarget = {
  date: string
  firm: string
  analyst: string
  rating: string
  target: number
  priorTarget?: number
  note: string
  source?: string
}

/** S&P Global poll as of 8 Sep 2026 (StockAnalysis). */
export const streetConsensus = {
  mean: 222.32,
  median: 225,
  low: 117,
  high: 450,
  analysts: 35,
  asOf: '2026-09-08',
  source: 'S&P Global',
}

/**
 * Latest named-house 12-month marks. Newest first.
 * Stance is computed vs the live tape in the UI, not from the house rating.
 */
export const streetTargets: StreetTarget[] = [
  {
    date: '2026-09-08',
    firm: 'Wells Fargo',
    analyst: 'Ken Gawrelski',
    rating: 'Overweight',
    target: 212,
    priorTarget: 215,
    note: 'Trimmed $215→$212. Still a Buy-equivalent mark above the tape.',
  },
  {
    date: '2026-09-08',
    firm: 'Pivotal Research',
    analyst: 'Jeffrey Wlodarczak',
    rating: 'Buy',
    target: 220,
    note: 'Initiated coverage with a $220 12-month target.',
  },
  {
    date: '2026-09-07',
    firm: 'Goldman Sachs',
    analyst: 'Eric Sheridan',
    rating: 'Buy',
    target: 220,
    priorTarget: 205,
    note: 'Raised $205→$220 after the first post-IPO print. AI + connectivity + launch.',
    source:
      'https://eulerpool.com/news/technology/goldman-sachs-raises-price-target-for-spacex-to-220-us-dollars',
  },
  {
    date: '2026-09-02',
    firm: 'Deutsche Bank',
    analyst: 'Edison Yu',
    rating: 'Buy',
    target: 235,
    note: 'Maintains $235. Launch + Starlink scale.',
  },
  {
    date: '2026-09-02',
    firm: 'Oppenheimer',
    analyst: 'Timothy Horan',
    rating: 'Outperform',
    target: 280,
    priorTarget: 250,
    note: 'Lifted $250→$280. One of the higher bulge-bracket marks.',
  },
  {
    date: '2026-09-02',
    firm: 'Bank of America',
    analyst: 'Ronald Epstein',
    rating: 'Buy',
    target: 235,
    note: 'Maintains Buy. Target last printed at initiation ($235).',
  },
  {
    date: '2026-09-01',
    firm: 'Morgan Stanley',
    analyst: 'Adam Jonas',
    rating: 'Overweight',
    target: 300,
    note: 'Reiterated $300 — “bulls aren’t thinking big enough” on Starship + xAI.',
    source:
      'https://www.benzinga.com/markets/tech/26/08/61445400/spacex-bulls-arent-thinking-big-enough-morgan-stanley-says',
  },
  {
    date: '2026-09-01',
    firm: 'J.P. Morgan',
    analyst: 'Doug Anmuth',
    rating: 'Overweight',
    target: 240,
    note: 'Reiterated $240. Core bulge-bracket Buy.',
  },
  {
    date: '2026-09-01',
    firm: 'Fubon Securities',
    analyst: 'Desk',
    rating: 'Buy',
    target: 183,
    note: 'Initiated $183. Tighter than US bulge; still above the tape.',
  },
  {
    date: '2026-08-31',
    firm: 'Bernstein',
    analyst: 'Douglas Harned',
    rating: 'Outperform',
    target: 248,
    priorTarget: 239,
    note: 'Raised $239→$248.',
  },
  {
    date: '2026-08-27',
    firm: 'Evercore ISI',
    analyst: 'Kutgun Maral',
    rating: 'Outperform',
    target: 230,
    note: 'Maintains $230 from July initiate.',
  },
  {
    date: '2026-08-26',
    firm: 'Wolfe Research',
    analyst: 'Myles Walton',
    rating: 'Outperform',
    target: 175,
    note: 'Reiterated Outperform at $175 — closer to the tape than bulge bulls.',
  },
  {
    date: '2026-08-21',
    firm: 'DZ Bank',
    analyst: 'Desk',
    rating: 'Sell',
    target: 100,
    note: 'Initiated Sell at $100. European house, Street low-tier.',
  },
  {
    date: '2026-08-17',
    firm: 'UBS',
    analyst: 'John Hodulik',
    rating: 'Buy',
    target: 75,
    priorTarget: 210,
    note: 'Target cut $210→$75 while the rating stayed Buy. Treat as the Street floor.',
  },
  {
    date: '2026-08-11',
    firm: 'Arete Research',
    analyst: 'Andrew Beale',
    rating: 'Buy',
    target: 450,
    note: 'Set $450. High print in the S&P poll (Street high $450).',
  },
  {
    date: '2026-08-05',
    firm: 'Needham',
    analyst: 'Ryan Koontz',
    rating: 'Buy',
    target: 250,
    priorTarget: 200,
    note: 'Reiterated $250 after the July raise from $200.',
  },
  {
    date: '2026-08-05',
    firm: 'Cantor Fitzgerald',
    analyst: 'Colin Canfield',
    rating: 'Overweight',
    target: 246,
    note: 'Maintains $246 Overweight.',
  },
  {
    date: '2026-08-05',
    firm: 'Piper Sandler',
    analyst: 'Alexander Potter',
    rating: 'Neutral',
    target: 140,
    priorTarget: 156,
    note: 'Cut $156→$140. Hold-equivalent, near the live tape.',
  },
  {
    date: '2026-07-23',
    firm: 'HSBC',
    analyst: 'Nicolas Cote-Colisson',
    rating: 'Hold',
    target: 115,
    note: 'Initiated Hold at $115. Below the tape.',
  },
  {
    date: '2026-07-07',
    firm: 'Mizuho',
    analyst: 'Desk',
    rating: 'Outperform',
    target: 200,
    note: 'Initiated Outperform at $200.',
  },
  {
    date: '2026-07-07',
    firm: 'Stifel',
    analyst: 'Jonathan Siegmann',
    rating: 'Buy',
    target: 190,
    note: 'Initiated / maintained $190.',
  },
  {
    date: '2026-07-07',
    firm: 'Moffett Nathanson',
    analyst: 'Julie Zhu',
    rating: 'Neutral',
    target: 131,
    note: 'Initiated Neutral at $131. Below the tape.',
  },
  {
    date: '2026-06-30',
    firm: 'Wedbush',
    analyst: 'Dan Ives',
    rating: 'Outperform',
    target: 190,
    note: 'Initiated Outperform at $190.',
  },
  {
    date: '2026-06-12',
    firm: 'CFRA',
    analyst: 'Keith Snyder',
    rating: 'Sell',
    target: 115,
    note: 'Initiated Sell at $115 on IPO day.',
  },
]
