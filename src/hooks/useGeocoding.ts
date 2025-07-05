import { useState, useEffect } from 'react';

interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

interface UseGeocodingReturn {
  suggestions: GeocodingResult[];
  loading: boolean;
  error: string | null;
}

export default function useGeocoding(searchQuery: string): UseGeocodingReturn {
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=10&language=en&format=json`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data.results) {
          setSuggestions([]);
          return;
        }

        const formattedResults: GeocodingResult[] = data.results.map((result: {
          id: number;
          name: string;
          latitude: number;
          longitude: number;
          country: string;
          admin1?: string;
        }) => ({
          id: result.id,
          name: result.name,
          latitude: result.latitude,
          longitude: result.longitude,
          country: result.country,
          admin1: result.admin1,
        }));

        setSuggestions(formattedResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch location data');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return { suggestions, loading, error };
}