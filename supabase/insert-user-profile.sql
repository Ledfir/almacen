-- ===========================================================
-- CREAR PERFIL DE USUARIO MANUALMENTE
-- ===========================================================
-- Ejecuta este SQL si el trigger automático no funcionó

-- IMPORTANTE: Primero necesitas obtener el user_id del usuario creado
-- Ve a Authentication > Users y copia el UUID del usuario operador@cnc.com

-- Reemplaza 'USER_ID_AQUI' con el UUID real del usuario
INSERT INTO public.employee_profiles (
  user_id, 
  employee_id, 
  email, 
  full_name, 
  department, 
  position
)
VALUES (
  'USER_ID_AQUI',  -- Reemplaza esto con el UUID del usuario de Authentication
  'CNC-001',
  'operador@cnc.com',
  'Operador Principal',
  'Producción',
  'Operador CNC'
)
ON CONFLICT (employee_id) DO NOTHING;

-- Para verificar que se creó correctamente:
SELECT * FROM public.employee_profiles WHERE employee_id = 'CNC-001';
