import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../hooks/useToast'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  function validate() {
    const errs = {}
    if (!form.username.trim()) errs.username = 'Usuário é obrigatório'
    if (!form.password) errs.password = 'Senha é obrigatória'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const data = await login(form.username.trim(), form.password)
      const isAdmin = data.role === 'ADMIN'
      toast.success(`Bem-vindo${isAdmin ? ', Administrador' : ''}! ✂`)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || 'Usuário ou senha inválidos'
      toast.error(msg)
      setErrors({ password: 'Verifique suas credenciais' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo / Branding */}
        <div className={styles.brand}>
          <div className={styles.logoCircle}>
            <span className={styles.logoIcon}>✂</span>
          </div>
          <h1 className={styles.title}>BarberElite</h1>
          <p className={styles.subtitle}>Sistema de Agendamentos</p>
        </div>

        {/* Formulário */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            label="Usuário"
            placeholder="Seu nome de usuário"
            value={form.username}
            onChange={(e) => handleChange('username', e.target.value)}
            error={errors.username}
            autoComplete="username"
            autoFocus
          />

          <div className={styles.passwordWrapper}>
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua senha"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>

          <Button type="submit" loading={loading} fullWidth size="lg">
            Entrar
          </Button>
        </form>

        {/* Hint para o usuário */}
        <div className={styles.hint}>
          <p>Cliente? Use qualquer usuário e senha.</p>
          <p>Barbeiro? Use a senha de administrador.</p>
        </div>
      </div>
    </div>
  )
}