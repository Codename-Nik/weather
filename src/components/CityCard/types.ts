export interface WeatherCardProps {
  city: string;
}

export interface WeatherData {
  city: string;
  lat: number;
  lng: number;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  weatherStatus?: string;
}