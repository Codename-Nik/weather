"use client"
import { Card, Button, Spinner } from 'react-bootstrap'
import useFetchWeather from '@/hooks/useFetchWeather'
import styles from './styles.module.scss'
import { WeatherCardProps } from '@/components/CityCard/types'

export default function CityCard({ city }: WeatherCardProps) {
  const { weather, loading, error } = useFetchWeather(city)

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        
        {loading && (
          <div className="text-center">
            <Spinner animation="border" size="sm" />
          </div>
        )}
        
        {error && <Card.Text className="text-danger">{error}</Card.Text>}
        
        {weather && (
          <>
            <Card.Text>
              Температура: {weather.temperature}°C
            </Card.Text>
            <Card.Text>
              Состояние: {weather.weatherStatus}
            </Card.Text>
            <Card.Text>
              Скорость ветра: {weather.windSpeed} м/с
            </Card.Text>
            <Button 
              href={`/weather/${encodeURIComponent(city)}?lat=${weather.lat}&lng=${weather.lng}`}
              variant="primary"
            >
              Смотреть прогноз
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  )
}