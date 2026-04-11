import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import styles from './NotFound.module.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.subtitle}>
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button onClick={() => navigate('/')} size="lg">
          Voltar ao início
        </Button>
      </div>
    </div>
  )
}