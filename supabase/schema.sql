-- ===========================================================
-- ESQUEMA DE BASE DE DATOS PARA CNC WORKSHOP INVENTORY
-- ===========================================================
-- Este script crea las tablas necesarias para el sistema de inventario
-- Ejecuta este script en el SQL Editor de Supabase

-- ===========================================================
-- 1. TABLA DE PERFILES DE EMPLEADOS
-- ===========================================================
-- Extiende la tabla de usuarios de Supabase con información adicional
CREATE TABLE IF NOT EXISTS public.employee_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  employee_id VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  position VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_employee_profiles_user_id ON public.employee_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_employee_profiles_employee_id ON public.employee_profiles(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_profiles_email ON public.employee_profiles(email);

-- ===========================================================
-- 2. TABLA DE INVENTARIO DE HERRAMIENTAS
-- ===========================================================
CREATE TABLE IF NOT EXISTS public.tools_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_code VARCHAR(50) UNIQUE NOT NULL,
  tool_name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  quantity INTEGER DEFAULT 0,
  unit VARCHAR(50),
  min_stock INTEGER DEFAULT 0,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'available', -- available, in_use, maintenance, out_of_stock
  cost_per_unit DECIMAL(10, 2),
  supplier VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_tools_inventory_tool_code ON public.tools_inventory(tool_code);
CREATE INDEX IF NOT EXISTS idx_tools_inventory_category ON public.tools_inventory(category);
CREATE INDEX IF NOT EXISTS idx_tools_inventory_status ON public.tools_inventory(status);

-- ===========================================================
-- 3. TABLA DE MÁQUINAS CNC
-- ===========================================================
CREATE TABLE IF NOT EXISTS public.cnc_machines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_code VARCHAR(50) UNIQUE NOT NULL,
  machine_name VARCHAR(255) NOT NULL,
  model VARCHAR(100),
  manufacturer VARCHAR(100),
  status VARCHAR(50) DEFAULT 'operational', -- operational, maintenance, offline, error
  location VARCHAR(255),
  last_maintenance_date DATE,
  next_maintenance_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_cnc_machines_machine_code ON public.cnc_machines(machine_code);
CREATE INDEX IF NOT EXISTS idx_cnc_machines_status ON public.cnc_machines(status);

-- ===========================================================
-- 4. TABLA DE MOVIMIENTOS DE INVENTARIO
-- ===========================================================
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools_inventory(id) ON DELETE CASCADE NOT NULL,
  employee_id UUID REFERENCES public.employee_profiles(id) NOT NULL,
  movement_type VARCHAR(50) NOT NULL, -- in, out, transfer, adjustment
  quantity INTEGER NOT NULL,
  from_location VARCHAR(255),
  to_location VARCHAR(255),
  machine_id UUID REFERENCES public.cnc_machines(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_inventory_movements_tool_id ON public.inventory_movements(tool_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_employee_id ON public.inventory_movements(employee_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_created_at ON public.inventory_movements(created_at);

-- ===========================================================
-- 5. POLÍTICAS DE SEGURIDAD (Row Level Security)
-- ===========================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.employee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cnc_machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;

-- Política para employee_profiles: Los usuarios solo pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.employee_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política para employee_profiles: Solo usuarios autenticados pueden actualizar su perfil
CREATE POLICY "Users can update own profile"
  ON public.employee_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Política para tools_inventory: Todos los usuarios autenticados pueden leer
CREATE POLICY "Authenticated users can view inventory"
  ON public.tools_inventory
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para cnc_machines: Todos los usuarios autenticados pueden leer
CREATE POLICY "Authenticated users can view machines"
  ON public.cnc_machines
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para inventory_movements: Todos los usuarios autenticados pueden leer
CREATE POLICY "Authenticated users can view movements"
  ON public.inventory_movements
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para inventory_movements: Usuarios autenticados pueden crear movimientos
CREATE POLICY "Authenticated users can create movements"
  ON public.inventory_movements
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ===========================================================
-- 6. FUNCIÓN PARA ACTUALIZAR TIMESTAMP
-- ===========================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at automáticamente
CREATE TRIGGER update_employee_profiles_updated_at
  BEFORE UPDATE ON public.employee_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tools_inventory_updated_at
  BEFORE UPDATE ON public.tools_inventory
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cnc_machines_updated_at
  BEFORE UPDATE ON public.cnc_machines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===========================================================
-- 7. FUNCIÓN PARA CREAR PERFIL AUTOMÁTICAMENTE
-- ===========================================================
-- Esta función crea un perfil de empleado cuando se registra un nuevo usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.employee_profiles (user_id, email, full_name, employee_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'employee_id', 'TEMP-' || substr(NEW.id::text, 1, 8))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ===========================================================
-- 8. DATOS DE EJEMPLO (OPCIONAL)
-- ===========================================================
-- Descomentar para insertar datos de prueba

-- INSERT INTO public.tools_inventory (tool_code, tool_name, description, category, quantity, unit, min_stock, location, status, cost_per_unit)
-- VALUES
--   ('TL-001', 'Broca de carburo 10mm', 'Broca de carburo de tungsteno', 'Brocas', 50, 'unidad', 10, 'Almacén A-1', 'available', 15.50),
--   ('TL-002', 'Fresa de acabado 20mm', 'Fresa de alta velocidad', 'Fresas', 30, 'unidad', 5, 'Almacén A-2', 'available', 45.00),
--   ('TL-003', 'Inserto CNMG 432', 'Inserto de torneado', 'Insertos', 200, 'unidad', 50, 'Almacén B-1', 'available', 8.75);

-- INSERT INTO public.cnc_machines (machine_code, machine_name, model, manufacturer, status, location)
-- VALUES
--   ('CNC-001', 'Torno CNC Principal', 'LT-300', 'DMG MORI', 'operational', 'Área de Producción 1'),
--   ('CNC-002', 'Centro de Mecanizado', 'VMC-850', 'HAAS', 'operational', 'Área de Producción 2'),
--   ('CNC-003', 'Torno Vertical', 'VTL-2500', 'MAZAK', 'maintenance', 'Área de Producción 1');

-- ===========================================================
-- FIN DEL SCRIPT
-- ===========================================================
