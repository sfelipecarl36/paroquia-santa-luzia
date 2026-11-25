import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Eye, EyeOff, LockKeyhole, Mail, Church } from 'lucide-react'

import { loginAdmin } from '../../services/authService'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { user, isAdmin, loading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (loading) {
    return <div className="admin-loading">Carregando...</div>
  }

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await loginAdmin(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível realizar o acesso.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="admin-login">
      <div className="login-decoration" />

      <section className="login-card">
        <div className="login-brand">
          <img
            src="/images/brasao-paroquia.png"
            alt="Brasão da Paróquia Santa Luzia"
          />

          <span>PARÓQUIA SANTA LUZIA</span>
          <small>DO BOM FUTURO</small>
        </div>

        <div className="login-heading">
          <div className="login-icon">
            <Church size={24} />
          </div>

          <h1>Bem-vindo de volta.</h1>

          <p>
            Acesse o painel administrativo da nossa paróquia.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>

          <div className="login-input">
            <Mail size={18} />

            <input
              id="email"
              type="email"
              placeholder="Seu e-mail administrativo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <label htmlFor="password">Senha</label>

          <div className="login-input">
            <LockKeyhole size={18} />

            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={submitting}
          >
            {submitting ? 'Verificando acesso...' : 'Entrar no painel'}
          </button>
        </form>

        <div className="login-footer">
          <LockKeyhole size={14} />
          Acesso restrito à administração paroquial
        </div>
      </section>

      <p className="login-copyright">
        © {new Date().getFullYear()} Paróquia Santa Luzia do Bom Futuro
      </p>
    </main>
  )
}
