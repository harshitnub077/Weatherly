export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: string;
}
