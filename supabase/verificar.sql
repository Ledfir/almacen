-- Verificar que el perfil existe correctamente
SELECT 
  employee_id,
  email,
  full_name,
  department,
  position,
  is_active,
  created_at
FROM public.employee_profiles 
WHERE employee_id = 'CNC-001' OR email = 'operador@cnc.com';
