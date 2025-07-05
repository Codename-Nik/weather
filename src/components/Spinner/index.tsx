import { Spinner as BootstrapSpinner } from 'react-bootstrap'
import styles from './index.module.scss'

interface SpinnerProps {
  size?: 'sm' | undefined
  className?: string
  animation?: 'border' | 'grow'
}

export default function Spinner({
  size = undefined,
  className = '',
  animation = 'border',
}: SpinnerProps) {
  return (
    <div className={`${styles.spinnerWrapper} ${className}`}>
      <BootstrapSpinner
        animation={animation}
        size={size}
        role="status"
        aria-hidden="true"
      >
        <span className="visually-hidden">Загрузка...</span>
      </BootstrapSpinner>
    </div>
  )
}