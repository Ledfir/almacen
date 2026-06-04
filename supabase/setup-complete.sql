-- ===========================================================
-- SETUP COMPLETO DE LA BASE DE DATOS
-- ===========================================================
-- Ejecuta todo este archivo en el SQL Editor de Supabase

-- 1. Crear tabla de perfiles de empleados
CREATE TABLE IF NOT EXISTS public.employee_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_id VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  position VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_employee_profiles_user_id ON public.employee_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_employee_profiles_employee_id ON public.employee_profiles(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_profiles_email ON public.employee_profiles(email);

-- 3. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_employee_profiles_updated_at ON public.employee_profiles;
CREATE TRIGGER update_employee_profiles_updated_at
    BEFORE UPDATE ON public.employee_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE public.employee_profiles ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de seguridad
DROP POLICY IF EXISTS "Los usuarios pueden ver su propio perfil" ON public.employee_profiles;
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON public.employee_profiles
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Los usuarios autenticados pueden ver todos los perfiles" ON public.employee_profiles;
CREATE POLICY "Los usuarios autenticados pueden ver todos los perfiles" ON public.employee_profiles
    FOR SELECT USING (auth.role() = 'authenticated');

-- 7. Insertar el perfil del usuario existente
INSERT INTO public.employee_profiles (
  user_id, 
  employee_id, 
  email, 
  full_name,
  department,
  position,
  is_active
)
VALUES (
  'df8aa092-8fc5-4e1f-9dca-b6c833269981',  -- UUID del usuario operador@cnc.com
  'CNC-001',
  'operador@cnc.com',
  'Operador Principal',
  'Producción',
  'Operador CNC',
  true
)
ON CONFLICT (employee_id) DO NOTHING;

-- 8. Verificar que se creó correctamente
SELECT * FROM public.employee_profiles WHERE employee_id = 'CNC-001';
