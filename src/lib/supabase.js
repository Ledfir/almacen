import { createClient } from '@supabase/supabase-js'

// Obtener las credenciales desde las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validar que las credenciales estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Falta configurar las variables de entorno de Supabase. ' +
    'Copia el archivo .env.example como .env y completa las credenciales.'
  )
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Funciones auxiliares para autenticación

/**
 * Iniciar sesión con email y contraseña
 */
export const signInWithPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

/**
 * Iniciar sesión con ID de empleado (requiere configuración personalizada)
 * Esta función busca el usuario por employee_id y luego hace login
 */
export const signInWithEmployeeId = async (employeeId, password) => {
  try {
    // Primero buscar el email asociado al employee_id
    const { data: profile, error: profileError } = await supabase
      .from('employee_profiles')
      .select('email')
      .eq('employee_id', employeeId)
      .single()

    if (profileError || !profile) {
      return { 
        data: null, 
        error: { message: 'ID de empleado no encontrado' } 
      }
    }

    // Luego hacer login con el email encontrado
    return await signInWithPassword(profile.email, password)
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Cerrar sesión
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Obtener el usuario actual
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

/**
 * Registrar un nuevo usuario (admin)
 */
export const signUp = async (email, password, metadata = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  return { data, error }
}

/**
 * Recuperar contraseña
 */
export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  return { data, error }
}
