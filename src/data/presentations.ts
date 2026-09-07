export type Presentation = {
  title: string
  date: string
  kind: 'earnings' | 'ir' | 'ops' | 'policy'
  blurb: string
  url?: string
}

export const presentations: Presentation[] = [
  {
    title: 'Q2 2026 earnings call (first as public co.)',
    date: '2026-08-04',
    kind: 'earnings',
    blurb:
      'Rev $7.81B; Connectivity / AI / Space segment splits; Flight 14 orbital V3; NVDA Vera Rubin orbital design; ARR commentary.',
    url: 'https://www.cnbc.com/2026/08/04/spacex-spcx-earnings-live-updates-q2-2026.html',
  },
  {
    title: 'IPO prospectus / 424B4 lockup schedule',
    date: '2026-06-11',
    kind: 'ir',
    blurb:
      'Source of truth for staggered unlocks, earnings-triggered cliffs, Musk lock to IPO+1y.',
  },
  {
    title: 'Starship Flight 13 mission summary',
    date: '2026-07-24',
    kind: 'ops',
    blurb: 'First V3 payload on suborbital profile; intact Ship splashdown.',
    url: 'https://www.spacex.com/launches/starship-flight-13',
  },
  {
    title: 'FCC STA — Flight 14 orbital radios / V3 deploy',
    date: '2026-09-01',
    kind: 'ops',
    blurb: 'Communications authority from 15 Sep 2026; confirms orbital second-stage intent.',
  },
]
