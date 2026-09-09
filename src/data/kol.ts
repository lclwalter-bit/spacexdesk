import type { Stance } from '../lib/stance'

export type KolPost = {
  who: string
  role: string
  when: string
  source: string
  quote: string
  why: string
  stance: Stance
  url?: string
}

/** Curated primary quotes — Elon / ops first. Update as new primaries land. */
export const kolPosts: KolPost[] = [
  {
    who: 'Elon Musk',
    role: 'CEO, SpaceX',
    when: '2026-08-20',
    source: 'X',
    quote:
      'Probably catch the ship with the tower in a few months… If there had been a tower out to sea where we practiced landing the ship, it would have been caught. First reflight of the ship will be either end of this year or early next.',
    why: 'Defers Flight 14 tower catch; keeps orbital V3 as the near milestone.',
    stance: 'Stagnant',
  },
  {
    who: 'Elon Musk',
    role: 'CEO, SpaceX',
    when: '2026-08-04',
    source: 'Q2 earnings call',
    quote:
      'Flight 14 will be our first flight to fly our version three Starlink satellites… to operational orbit. [Vera Rubin / orbital DC] … we think the design of the NVL72 VR computer is a much better design…',
    why: 'Primary public framing of orbital Starlink + SpaceX–NVIDIA compute path.',
    stance: 'Bullish',
  },
  {
    who: 'Elon Musk',
    role: 'CEO, SpaceX',
    when: '2026-08',
    source: 'X / earnings context',
    quote:
      'Once Starship starts flying reliably several times per week… which means winding down Falcon.',
    why: 'Longer-term production pivot; Florida Falcon Starlink wind-down is the first ops proof.',
    stance: 'Bullish',
  },
  {
    who: 'Kiko Dontchev',
    role: 'VP Launch, SpaceX',
    when: '2026-09-01',
    source: 'X',
    quote:
      'This morning’s @SpaceX mission from pad 40 was the last planned Falcon 9 Starlink launch from Florida… From here on, Starlink missions out of Florida will fly on Starship. The West Coast team will continue regularly launching Starlink from Vandenberg.',
    why: 'Hard ops confirmation that East Coast Starlink cadence shifts to Starship.',
    stance: 'Bullish',
  },
  {
    who: 'Elon Musk',
    role: 'CEO, SpaceX / xAI context',
    when: '2026-09-01',
    source: 'G20 Tech remarks',
    quote: 'Called for lighter AI regulation — EU rules framed as innovation drag (wire paraphrase of primary remarks).',
    why: 'Secondary narrative for AI segment / xAI adjacency; not a tape mover vs unlock.',
    stance: 'Stagnant',
  },
  {
    who: 'Jared Isaacman',
    role: 'NASA Administrator',
    when: '2026-08-14',
    source: 'Public remarks',
    quote: 'Expected Flight 14 in early September; monthly-or-faster cadence builds Artemis confidence.',
    why: 'External schedule pressure / Artemis linkage.',
    stance: 'Stagnant',
  },
]
