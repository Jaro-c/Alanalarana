#!/bin/bash

# Ruta del proyecto
PROJECT_DIR=~/WWW/Alanalarana.com
APP_NAME="Alanalarana.com"

# Entrar en la carpeta del proyecto
cd "$PROJECT_DIR" || { echo "❌ No se pudo acceder a $PROJECT_DIR"; exit 1; }

echo "📡 Buscando cambios en el repositorio..."
git fetch origin main

# Verificar si hay cambios antes de hacer pull
if git diff --quiet HEAD origin/main; then
    echo "✅ No hay actualizaciones disponibles."
    exit 0
fi

echo "🚀 Descargando los últimos cambios..."
git pull origin main || { echo "❌ Error al actualizar el repositorio"; exit 1; }

echo "🛑 Apagando la aplicación..."
pm2 stop "$APP_NAME" || echo "⚠️ La aplicación no estaba en ejecución."

# Si package.json cambió, actualizar dependencias
if git diff --name-only HEAD@{1} HEAD | grep -q "package.json" || git diff --name-only origin/main HEAD | grep -q "package.json"; then
    echo "📦 Cambios en package.json detectados, reinstalando dependencias..."
    rm -rf node_modules .next
    pnpm install || { echo "❌ Error al instalar dependencias"; exit 1; }
fi

echo "🏗️ Construyendo el proyecto..."
if ! pnpm run build; then
    echo "❌ Falló la compilación. Deteniendo el despliegue."
    exit 1
fi

echo "🔄 Iniciando la aplicación..."
pm2 restart "$APP_NAME" || { echo "❌ Error al reiniciar la aplicación"; exit 1; }

echo "✅ Despliegue completado con éxito."