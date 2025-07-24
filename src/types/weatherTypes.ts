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

export interface AirQualityMetrics {
  aqi: number;
  pm2_5: number;
  pm10: number;
  o3: number;
  no2: number;
}
