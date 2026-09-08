export type Stance = 'Bullish' | 'Bearish' | 'Stagnant'

/** Target vs last: outside ±5% is a directional mark; inside the band is stagnant. */
export const TARGET_STANCE_BAND = 0.05

export function stanceFromTarget(
  target: number,
  last: number,
  band = TARGET_STANCE_BAND,
): Stance {
  if (!Number.isFinite(target) || !Number.isFinite(last) || last === 0) {
    return 'Stagnant'
  }
  const pct = (target - last) / last
  if (pct > band) return 'Bullish'
  if (pct < -band) return 'Bearish'
  return 'Stagnant'
}
