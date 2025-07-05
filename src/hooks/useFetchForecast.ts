import { useState, useEffect } from 'react'
import { ForecastData } from '@/utils/types'

export default function useFetchForecast(lat: string | null, lng: string | null) {
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!lat || !lng) return

    const fetchForecast = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`
        )
        const data = await response.json()
        
        if (!data.daily) {
          throw new Error('Данные о прогнозе не получены')
        }
        
        setForecast({
          dates: data.daily.time,
          minTemps: data.daily.temperature_2m_min,
          maxTemps: data.daily.temperature_2m_max,
          weatherCodes: data.daily.weathercode,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }
    }
    
    fetchForecast()
  }, [lat, lng])

  return { forecast, loading, error }
}