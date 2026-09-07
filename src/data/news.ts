export type NewsItem = {
  date: string
  outlet: string
  title: string
  summary: string
  url?: string
  tags: string[]
}

export const newsItems: NewsItem[] = [
  {
    date: '2026-09-03',
    outlet: 'Tape / AVGO',
    title: 'Broadcom AI beat, soft Q4 guide — SPCX held relative strength',
    summary:
      'AVGO AI revenue +221% to $16.7B but sold on $34.8B Q4 guide. SPCX reclaimed toward $144 while NVDA bid — AI demand intact, AVGO guide-specific.',
    tags: ['AI', 'macro'],
  },
  {
    date: '2026-09-02',
    outlet: 'FinanceFeeds',
    title: '319M unlock Sept 9 — SPCX near $142',
    summary:
      'Day-90 tranche ~319M (~2.4%), affiliate ~59M on Sept 10. Firmer entry than Aug 20 (~$137) means less pre-fade cushion.',
    url: 'https://financefeeds.com/spacex-spcx-share-unlock-september-9/',
    tags: ['unlock'],
  },
  {
    date: '2026-09-01',
    outlet: 'Teslarati',
    title: 'FCC filing: Starship Flight 14 going to orbit',
    summary:
      'STA covers orbital second stage and Starlink V3 deployment window from Sept 15. Radio authority ≠ FAA flight license.',
    url: 'https://www.teslarati.com/spacex-tells-the-fcc-that-starship-flight-14-is-going-to-orbit/',
    tags: ['Starship', 'ops'],
  },
  {
    date: '2026-09-01',
    outlet: 'SpaceX ops / X',
    title: 'Last planned Falcon 9 Starlink from Florida',
    summary:
      'Dontchev: Florida Starlink moves to Starship; Vandenberg keeps Falcon Starlink. Aligns with Musk wind-down-Falcon framing.',
    tags: ['Starlink', 'ops'],
  },
  {
    date: '2026-08-28',
    outlet: 'Starbase',
    title: 'Booster 21 full 33-engine static fire',
    summary: 'Clears major F14 booster milestone on Pad 2 ahead of orbital attempt.',
    tags: ['Starship'],
  },
  {
    date: '2026-08-28',
    outlet: 'Fed / Jackson Hole',
    title: 'Warsh: inflation “work to do” — hike odds jump',
    summary:
      'Sept FOMC hike odds ~57–60%. Growth multiples (NVDA/SPCX) sensitive into NFP/CPI.',
    tags: ['macro'],
  },
  {
    date: '2026-08-04',
    outlet: 'CNBC / IR',
    title: 'Q2: revenue $7.81B (+92%), Connectivity profit engine',
    summary:
      'Beat Street; after-hours soft on capex/AI losses. Musk ARR $100B YE26 framing; Starmind + NVIDIA announced.',
    url: 'https://www.cnbc.com/2026/08/04/spacex-spcx-earnings-live-updates-q2-2026.html',
    tags: ['earnings', 'AI'],
  },
]
