import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    session,
    loading,
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    },
    signInWithEmployeeId: async (employeeId, password) => {
      try {
        // Buscar el email asociado al employee_id
        const { data: profile, error: profileError } = await supabase
          .from('employee_profiles')
          .select('email')
          .eq('employee_id', employeeId)
          .single()

        if (profileError || !profile) {
          return {
            data: null,
            error: { message: 'ID de empleado no encontrado' },
          }
        }

        // Login con el email encontrado
        const { data, error } = await supabase.auth.signInWithPassword({
          email: profile.email,
          password,
        })
        return { data, error }
      } catch (error) {
        return { data: null, error }
      }
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      return { error }
    },
    signUp: async (email, password, metadata = {}) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })
      return { data, error }
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
