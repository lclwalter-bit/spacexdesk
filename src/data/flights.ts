import type { Stance } from '../lib/stance'

export type Flight = {
  id: string
  vehicle: string
  netDate: string
  site: string
  status: 'done' | 'scheduled' | 'target'
  payload: string
  notes: string
  stance: Stance
}

export type CadenceNote = {
  text: string
  stance: Stance
}

export const flights: Flight[] = [
  {
    id: 'F13',
    vehicle: 'Starship / Ship 40 + Super Heavy',
    netDate: '2026-07-24',
    site: 'Starbase, TX',
    status: 'done',
    payload: '20× Starlink V3 (suborbital demo)',
    notes: 'First V3 deploy on suborbital arc; Ship intact splashdown Indian Ocean. Tower catch not attempted.',
    stance: 'Bullish',
  },
  {
    id: 'F14',
    vehicle: 'Starship / Ship 41 + Booster 21',
    netDate: '2026-09-15',
    site: 'Starbase Pad 2, TX',
    status: 'target',
    payload: '~20× Starlink V3 to operational orbit',
    notes:
      'First true orbital Starship attempt per FCC STA. B21 33-engine static fire 28 Aug; Ship 41 six-engine done. Tower catch deferred (Musk ~20 Aug: “a few months”). FAA license still the gate.',
    stance: 'Bullish',
  },
  {
    id: 'SL-FL-last',
    vehicle: 'Falcon 9',
    netDate: '2026-09-01',
    site: 'CCSFS SLC-40',
    status: 'done',
    payload: 'Starlink (final planned Florida Falcon Starlink)',
    notes:
      'Kiko Dontchev (X): last planned Falcon 9 Starlink from Florida; Florida Starlink → Starship; Vandenberg continues Falcon Starlink.',
    stance: 'Bullish',
  },
]

export const cadenceNotes: CadenceNote[] = [
  {
    text: 'Musk: once Starship flies reliably several times per week → wind down Falcon engineering/production toward multi-flight/day Starship.',
    stance: 'Bullish',
  },
  {
    text: 'Target ~1,000 Starlink V3 by ~Q2 2027 for bandwidth step-change / DTC expansion.',
    stance: 'Bullish',
  },
  {
    text: 'Starbase Louisiana announced for high-cadence Starship (construction ~2027, launches earliest ~2029).',
    stance: 'Stagnant',
  },
]
