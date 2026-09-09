export type NyClock = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  weekday: string
  dateStr: string
  mins: number
}

const PREP_MINS = 9 * 60 + 20

export function nyClock(now = new Date()): NyClock {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  let hour = Number(get('hour'))
  if (hour === 24) hour = 0
  const month = get('month')
  const day = get('day')
  const year = Number(get('year'))
  return {
    year,
    month: Number(month),
    day: Number(day),
    hour,
    minute: Number(get('minute')),
    weekday: get('weekday'),
    dateStr: `${year}-${month}-${day}`,
    mins: hour * 60 + Number(get('minute')),
  }
}

export function isNyWeekend(clock: NyClock) {
  return clock.weekday === 'Sat' || clock.weekday === 'Sun'
}

export function isAfterRthPrep(clock: NyClock) {
  return !isNyWeekend(clock) && clock.mins >= PREP_MINS
}

/** Walk back to the previous Mon–Fri NY date (YYYY-MM-DD). */
export function previousWeekday(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  let t = Date.UTC(y, m - 1, d, 16, 0, 0)
  for (let i = 0; i < 8; i++) {
    t -= 86_400_000
    const clock = nyClock(new Date(t))
    if (!isNyWeekend(clock)) return clock.dateStr
  }
  return dateStr
}

export function sessionDate(clock = nyClock()) {
  if (isNyWeekend(clock) || !isAfterRthPrep(clock)) {
    return previousWeekday(clock.dateStr)
  }
  return clock.dateStr
}

export function nextPrepLabel(clock = nyClock()) {
  if (!isNyWeekend(clock) && clock.mins < PREP_MINS) {
    return `today 9:20 ET`
  }
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const idx = names.indexOf(clock.weekday)
  let add = 1
  if (!isNyWeekend(clock) && clock.mins >= PREP_MINS) add = 1
  if (clock.weekday === 'Fri' && clock.mins >= PREP_MINS) add = 3
  if (clock.weekday === 'Sat') add = 2
  if (clock.weekday === 'Sun') add = 1
  const next = names[(idx + add) % 7]
  return `${next} 9:20 ET`
}

export function daysUntilIso(isoDate: string, fromDateStr: string) {
  const a = Date.parse(`${isoDate}T00:00:00Z`)
  const b = Date.parse(`${fromDateStr}T00:00:00Z`)
  if (Number.isNaN(a) || Number.isNaN(b)) return null
  return Math.round((a - b) / 86_400_000)
}
