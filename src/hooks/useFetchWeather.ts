import { useState, useEffect } from 'react'
import { WeatherData } from '@/utils/types'

export default function useFetchWeather(city: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        )
        const geoData = await geoResponse.json()
        
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('Город не найден')
        }
        
        const { latitude: lat, longitude: lng } = geoData.results[0]
        
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&windspeed_unit=ms`
        )
        const weatherData = await weatherResponse.json()
        
        setWeather({
          city,
          lat,
          lng,
          temperature: weatherData.current_weather.temperature,
          windSpeed: weatherData.current_weather.windspeed,
          weatherCode: weatherData.current_weather.weathercode,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }
    }
    
    fetchWeather()
  }, [city])

  return { weather, loading, error }
}