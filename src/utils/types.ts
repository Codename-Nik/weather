export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
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

export interface DailyForecastData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface ForecastData {
  dates: string[];
  minTemps: number[];
  maxTemps: number[];
  weatherCodes: number[];
}

export interface CityCardProps {
  city: string;
}

export interface WeatherTableProps {
  forecast: ForecastData;
}


export interface AutocompleteInputProps {
  className?: string;
}

export interface SpinnerProps {
  size?: 'sm' | undefined;
  className?: string;
  animation?: 'border' | 'grow';
}

export type WeatherInterpretation = {
  [key: number]: string;
};

export interface GeocodingApiResponse {
  results?: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }[];
  generationtime_ms?: number;
}

export interface CurrentWeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeatherData;
}

export interface ForecastApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily: DailyForecastData;
}

export interface UseGeocodingReturn {
  suggestions: GeocodingResult[];
  loading: boolean;
  error: string | null;
}

export interface UseFetchWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export interface UseFetchForecastReturn {
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
}