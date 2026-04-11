import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../hooks/useToast'
import Button from '../common/Button'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch {
      toast.error('Erro ao sair')
    }
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>✂</span>
          <span className={styles.name}>BarberElite</span>
        </div>

        <nav className={styles.nav} aria-label="Navegação principal">
          {isAdmin && (
            <span className={styles.badge}>Admin</span>
          )}
          {user && (
            <span className={styles.username}>{user.username}</span>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </nav>
      </div>
    </header>
  )
}