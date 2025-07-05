"use client";
import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import WeatherTable from '@/components/WeatherTable';
import useFetchForecast from '@/hooks/useFetchForecast';
import { Button, Spinner } from 'react-bootstrap';

export default function WeatherForecastPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = use(params);
  const searchParams = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  
  const { forecast, loading, error } = useFetchForecast(lat, lng);
  const decodedCity = decodeURIComponent(city);

  return (
    <>
      <Button href="/" variant="link" className="mb-3">
        ← Назад
      </Button>
      
      <h2 className="mb-4">Прогноз погоды в городе {decodedCity}</h2>
      
      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">{error}</p>}
      {forecast && <WeatherTable forecast={forecast} />}
    </>
  );
}