import { Table } from 'react-bootstrap'
import { ForecastData } from '@/utils/types'
import { safeFormatShortDate, safeFormatWeekday } from '@/utils/dateFormatter'
import { getWeatherDescription } from '@/utils/weatherCodes'
import styles from './styles.module.scss'

interface WeatherTableProps {
  forecast: ForecastData
}

export default function WeatherTable({ forecast }: WeatherTableProps) {
  const tableData = forecast.dates.map((date, index) => ({
    date,
    weekday: safeFormatWeekday(date),
    shortDate: safeFormatShortDate(date),
    minTemp: forecast.minTemps[index],
    maxTemp: forecast.maxTemps[index],
    weatherCode: forecast.weatherCodes[index],
    weatherDescription: getWeatherDescription(forecast.weatherCodes[index])
  }))

  return (
    <div className={styles.tableContainer}>
      <Table bordered hover responsive className={styles.weatherTable}>
        <thead>
          <tr>
            <th>День</th>
            <th>Дата</th>
            <th>Мин. темп.</th>
            <th>Макс. темп.</th>
            <th>Погода</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((day, index) => (
            <tr key={index}>
              <td>{day.weekday}</td>
              <td>{day.shortDate}</td>
              <td className={styles.minTemp}>{day.minTemp.toFixed(1)}°C</td>
              <td className={styles.maxTemp}>{day.maxTemp.toFixed(1)}°C</td>
              <td className={styles.weatherDescription}>
                {day.weatherDescription}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}