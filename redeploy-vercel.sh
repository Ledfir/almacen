#!/bin/bash
# Script para redesplegar en Vercel después de configurar variables de entorno

echo "🔄 Redesplegando proyecto en Vercel..."
echo ""
echo "Las variables de entorno ya deben estar configuradas en Vercel:"
echo "  - VITE_SUPABASE_URL"
echo "  - VITE_SUPABASE_ANON_KEY"
echo ""
echo "Este commit forzará un nuevo despliegue que usará las variables configuradas."
echo ""

# Crear un commit vacío para forzar redespliegue
git commit --allow-empty -m "chore: redeploy with environment variables configured"

# Push a GitHub (Vercel se despliega automáticamente)
git push

echo ""
echo "✅ Push completado. Vercel comenzará a redesplegar automáticamente."
echo "   Verifica el progreso en: https://vercel.com/dashboard"
