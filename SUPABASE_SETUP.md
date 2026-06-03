# 🔐 Configuración de Supabase

Guía completa para configurar Supabase como backend y base de datos del CNC Workshop Inventory Portal.

## 📋 Índice

1. [Crear Proyecto en Supabase](#1-crear-proyecto-en-supabase)
2. [Configurar Base de Datos](#2-configurar-base-de-datos)
3. [Configurar Variables de Entorno](#3-configurar-variables-de-entorno)
4. [Crear Usuarios de Prueba](#4-crear-usuarios-de-prueba)
5. [Probar Autenticación](#5-probar-autenticación)
6. [Configurar Políticas de Seguridad](#6-configurar-políticas-de-seguridad)

---

## 1. Crear Proyecto en Supabase

### Paso 1: Registro y nuevo proyecto

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"** o **"Sign Up"**
3. Regístrate con GitHub, Google o email
4. Una vez dentro, haz clic en **"New Project"**
5. Completa los datos:
   - **Name**: `cnc-workshop-inventory` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura y guárdala
   - **Region**: Elige la más cercana a tus usuarios
   - **Pricing Plan**: Free tier es suficiente para empezar
6. Haz clic en **"Create new project"**
7. Espera 2-3 minutos mientras se crea el proyecto

### Paso 2: Obtener credenciales

1. En el dashboard, ve a **Settings** (⚙️) en el menú lateral
2. Haz clic en **API**
3. Copia estos dos valores:
   - **Project URL** (algo como `https://abcdefgh.supabase.co`)
   - **anon public** key (una cadena larga que empieza con `eyJ...`)

---

## 2. Configurar Base de Datos

### Paso 1: Ejecutar el esquema SQL

1. En el dashboard de Supabase, ve a **SQL Editor** en el menú lateral
2. Haz clic en **"New query"**
3. Abre el archivo `supabase/schema.sql` de este proyecto
4. Copia todo el contenido y pégalo en el editor SQL de Supabase
5. Haz clic en **"Run"** (o presiona `Ctrl/Cmd + Enter`)
6. Deberías ver un mensaje de éxito: **"Success. No rows returned"**

### Paso 2: Verificar las tablas

1. Ve a **Table Editor** en el menú lateral
2. Deberías ver estas tablas creadas:
   - `employee_profiles`
   - `tools_inventory`
   - `cnc_machines`
   - `inventory_movements`

---

## 3. Configurar Variables de Entorno

### Paso 1: Crear archivo .env

1. En la raíz del proyecto, copia el archivo `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Abre el archivo `.env` y completa con tus credenciales:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anon_aqui
   ```

### Paso 2: Configurar en Vercel (Producción)

Si vas a desplegar en Vercel:

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Ve a **Settings** → **Environment Variables**
3. Agrega estas dos variables:
   - `VITE_SUPABASE_URL`: Tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY`: Tu clave anon
4. Haz clic en **Save**
5. Redespliega el proyecto

---

## 4. Crear Usuarios de Prueba

### Método 1: Usando el SQL Editor

Ejecuta este SQL para crear un usuario de prueba:

```sql
-- Primero, ve a Authentication > Users en Supabase
-- Y crea un usuario manualmente, o usa este script:

-- Nota: Este script requiere permisos de admin
-- Es mejor crear usuarios desde la interfaz de Supabase

-- 1. Ir a Authentication > Users
-- 2. Click en "Add user"
-- 3. Llenar los datos:
--    Email: operador@cnc.com
--    Password: Test123456
--    Auto Confirm User: SÍ

-- 4. Luego ejecutar este SQL para crear el perfil:
INSERT INTO public.employee_profiles (
  user_id, 
  employee_id, 
  email, 
  full_name, 
  department, 
  position
)
VALUES (
  'ID_DEL_USUARIO_CREADO', -- Reemplaza con el ID del usuario
  'CNC-001',
  'operador@cnc.com',
  'Juan Pérez',
  'Producción',
  'Operador CNC Senior'
);
```

### Método 2: Usando la interfaz de Supabase (Recomendado)

1. Ve a **Authentication** → **Users** en el menú lateral
2. Haz clic en **"Add user"**
3. Llena el formulario:
   - **Email**: `operador@cnc.com`
   - **Password**: `Test123456`
   - **Auto Confirm User**: ✅ Activado
   - **User Metadata** (opcional):
     ```json
     {
       "employee_id": "CNC-001",
       "full_name": "Juan Pérez"
     }
     ```
4. Haz clic en **"Create user"**
5. El perfil se creará automáticamente gracias al trigger

### Usuarios de prueba sugeridos

| Employee ID | Email | Password | Rol |
|-------------|-------|----------|-----|
| CNC-001 | operador@cnc.com | Test123456 | Operador |
| CNC-002 | supervisor@cnc.com | Test123456 | Supervisor |
| CNC-003 | admin@cnc.com | Test123456 | Administrador |

---

## 5. Probar Autenticación

### Paso 1: Ejecutar el proyecto

```bash
npm run dev
```

### Paso 2: Probar login

1. Abre [http://localhost:5173](http://localhost:5173)
2. Ingresa las credenciales de prueba:
   - **ID de Empleado**: `CNC-001`
   - **Contraseña**: `Test123456`
3. Haz clic en **"INGRESAR AL SISTEMA"**
4. Deberías ver un mensaje de éxito

### Paso 3: Verificar en Supabase

1. Ve a **Authentication** → **Users** en Supabase
2. Deberías ver el usuario con status **"Online"**
3. Ve a **Table Editor** → **employee_profiles**
4. Verifica que el perfil esté creado

---

## 6. Configurar Políticas de Seguridad

Las políticas de Row Level Security (RLS) ya están configuradas en el esquema SQL. Estas son las políticas activas:

### Políticas de `employee_profiles`

- ✅ Los usuarios solo pueden ver su propio perfil
- ✅ Los usuarios solo pueden actualizar su propio perfil

### Políticas de `tools_inventory`

- ✅ Todos los usuarios autenticados pueden ver el inventario
- ❌ Solo administradores pueden modificar (agregar esta política si es necesario)

### Políticas de `cnc_machines`

- ✅ Todos los usuarios autenticados pueden ver las máquinas
- ❌ Solo administradores pueden modificar

### Políticas de `inventory_movements`

- ✅ Usuarios autenticados pueden ver movimientos
- ✅ Usuarios autenticados pueden crear movimientos

### Agregar política de administrador (opcional)

Si quieres que solo ciertos usuarios puedan modificar inventario:

```sql
-- Agregar campo de rol a employee_profiles
ALTER TABLE public.employee_profiles 
ADD COLUMN role VARCHAR(50) DEFAULT 'operator';

-- Actualizar un usuario como admin
UPDATE public.employee_profiles 
SET role = 'admin' 
WHERE employee_id = 'CNC-001';

-- Política para que solo admins puedan insertar herramientas
CREATE POLICY "Only admins can insert tools"
  ON public.tools_inventory
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.employee_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 🔧 Solución de Problemas

### Error: "Falta configurar las variables de entorno"

**Solución**: Verifica que el archivo `.env` existe y tiene las credenciales correctas.

```bash
# Verificar que existe
ls -la .env

# Ver contenido (sin mostrar claves sensibles)
cat .env | grep VITE_SUPABASE
```

### Error: "ID de empleado no encontrado"

**Solución**: Verifica que el perfil del empleado existe en la tabla `employee_profiles`:

```sql
SELECT * FROM public.employee_profiles WHERE employee_id = 'CNC-001';
```

### Error: "Invalid login credentials"

**Solución**: 
1. Verifica que el usuario existe en **Authentication** → **Users**
2. Verifica que el usuario está confirmado (no dice "Waiting for verification")
3. Intenta hacer login directamente con el email en lugar del employee_id

### Error de CORS o "Failed to fetch"

**Solución**:
1. Verifica que la URL de Supabase es correcta en `.env`
2. Verifica que la clave anon es correcta
3. Verifica que el proyecto de Supabase está activo (no pausado)

---

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Autenticación](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

## 🚀 Siguientes Pasos

Una vez configurado Supabase:

1. ✅ Crear usuarios de prueba
2. ✅ Probar login local
3. ✅ Desplegar a Vercel con variables de entorno
4. 📝 Crear componente de Dashboard
5. 📝 Implementar gestión de inventario
6. 📝 Agregar reportes y gráficos

---

**¿Necesitas ayuda?** Revisa los logs en:
- Consola del navegador (F12)
- Terminal donde corre `npm run dev`
- **Logs** en el dashboard de Supabase
