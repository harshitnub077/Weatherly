// Weather utility functions

export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export function fahrenheitToCelsius(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

export function getAqiDescription(aqi: number): { label: string; color: string } {
  const map: Record<number, { label: string; color: string }> = {
    1: { label: 'Good', color: '#22c55e' },
    2: { label: 'Fair', color: '#eab308' },
    3: { label: 'Moderate', color: '#f97316' },
    4: { label: 'Poor', color: '#ef4444' },
    5: { label: 'Very Poor', color: '#7f1d1d' },
  };
  return map[aqi] || { label: 'Unknown', color: '#94a3b8' };
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
}
