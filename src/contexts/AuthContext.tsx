import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { User } from '@supabase/supabase-js'

import { supabase } from '../services/supabase'
import { verificarAdmin } from '../services/authService'

interface Admin {
  user_id: string
  nome: string
}

interface AuthContextType {
  user: User | null
  admin: Admin | null
  loading: boolean
  isAdmin: boolean
  refreshAdmin: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  const carregarAdmin = useCallback(async (userId: string) => {
    try {
      const resultado = await verificarAdmin(userId)
      setAdmin(resultado)
    } catch (error) {
      console.error('Erro ao verificar administrador:', error)
      setAdmin(null)
    }
  }, [])

  const refreshAdmin = useCallback(async () => {
    if (!user) {
      setAdmin(null)
      return
    }

    await carregarAdmin(user.id)
  }, [user, carregarAdmin])

  useEffect(() => {
    let ativo = true

    const carregarSessao = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) throw error

        if (!ativo) return

        const currentUser = data.session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await carregarAdmin(currentUser.id)
        }
      } catch (error) {
        console.error('Erro ao carregar sessão:', error)
        if (ativo) {
          setUser(null)
          setAdmin(null)
        }
      } finally {
        if (ativo) setLoading(false)
      }
    }

    void carregarSessao()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!ativo) return

      const currentUser = session?.user ?? null

      setUser(currentUser)

      if (!currentUser) {
        setAdmin(null)
        setLoading(false)
        return
      }

      setLoading(true)

      void carregarAdmin(currentUser.id).finally(() => {
        if (ativo) setLoading(false)
      })
    })

    return () => {
      ativo = false
      subscription.unsubscribe()
    }
  }, [carregarAdmin])

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        isAdmin: !!admin,
        refreshAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth precisa ser utilizado dentro de AuthProvider.'
    )
  }

  return context
}