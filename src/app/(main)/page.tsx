import { Row, Col } from 'react-bootstrap'
import CityCard from '@/components/CityCard'
import AutocompleteInput from '@/components/AutocompleteInput'
import { cities } from '@/utils/constants'

export default function Home() {
  return (
    <>
      <h1 className="mb-4 text-center">Погода в избранных городах</h1>
      
      <AutocompleteInput className="mb-4" />
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {cities.map(city => (
          <Col key={city}>
            <CityCard city={city} />
          </Col>
        ))}
      </Row>
    </>
  )
}