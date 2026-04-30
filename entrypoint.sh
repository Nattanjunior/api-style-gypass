#!/bin/sh

echo "⏳ Aguardando banco..."

npx prisma migrate deploy

echo "🚀 Iniciando API..."
node build/server.cjs