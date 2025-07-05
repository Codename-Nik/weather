"use client"
import { useState, useRef, useEffect } from 'react'
import { Form, ListGroup, Spinner } from 'react-bootstrap'
import useGeocoding from '@/hooks/useGeocoding'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'

export default function AutocompleteInput({ className }: { className?: string }) {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const { suggestions, loading, error } = useGeocoding(inputValue)
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleSuggestionClick = (name: string, lat: number, lng: number) => {
    setInputValue(name)
    setShowSuggestions(false)
    router.push(`/weather/${encodeURIComponent(name)}?lat=${lat}&lng=${lng}`)
  }

  return (
    <div className={`${styles.autocomplete} ${className}`} ref={wrapperRef}>
      <Form.Group controlId="citySearch">
        <Form.Control
          type="text"
          placeholder="Введите город"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setShowSuggestions(true)
          }}
          onClick={() => setShowSuggestions(true)}
        />
      </Form.Group>
      
      {showSuggestions && inputValue && (
        <ListGroup className={styles.suggestions}>
          {loading && (
            <ListGroup.Item>
              <Spinner animation="border" size="sm" />
            </ListGroup.Item>
          )}
          {error && (
            <ListGroup.Item className="text-danger">{error}</ListGroup.Item>
          )}
          {suggestions.map((item, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleSuggestionClick(item.name, item.latitude, item.longitude)}
            >
              {item.name}, {item.country}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  )
}