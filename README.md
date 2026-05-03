# 🏋️ Serviço de Check-in

API REST para gerenciamento de usuários, academias e check-ins, construída com Node.js, TypeScript, Fastify, Prisma e PostgreSQL.

---

## 📌 Descrição

Aplicação que simula o backend de um sistema de check-in em academias.

Usuários podem:
- se cadastrar e autenticar
- buscar academias
- encontrar academias próximas
- realizar check-ins com validações de regras de negócio

Além disso, existem funcionalidades administrativas, como cadastro de academias e validação de check-ins.

---

## ⚙️ Funcionalidades

### 👤 Usuários
- Cadastro de usuários
- Autenticação com JWT
- Renovação de token com refresh token
- Consulta de perfil autenticado

### 🏋️ Academias
- Cadastro de academias (admin)
- Busca por nome
- Listagem de academias próximas (geolocalização)

### ✅ Check-ins
- Criação de check-in
- Histórico de check-ins
- Métricas de check-ins do usuário
- Validação de check-ins por administradores

---

## 🌍 Geolocalização

Um dos pontos centrais da aplicação é o uso de latitude e longitude.

A API utiliza coordenadas geográficas para:

- Buscar academias próximas do usuário
- Validar se o usuário está fisicamente próximo da academia para realizar o check-in

📏 Regra de negócio:
O check-in só é permitido se a distância entre o usuário e a academia estiver dentro de um limite definido.

---

## ⚡ Otimizações de Performance

### 🔁 Idempotência (via banco de dados)

Problema resolvido:
- Requisições duplicadas (ex: retries de rede) podem gerar check-ins duplicados

Solução implementada:
- Uso de **idempotency key**
- Constraint no banco de dados para garantir unicidade

📌 Resultado:
- Evita duplicidade de check-ins
- Garante consistência mesmo em cenários de retry

---

### 🚀 Cache com Redis

Problema:
- Todas as requisições indo direto para o banco

Solução:
- Cache inteligente para reduzir carga no banco

Atualmente cacheando:
- Academias próximas
- Perfil do usuário

📌 Benefícios:
- Redução de latência
- Menor carga no banco de dados
- Melhor escalabilidade

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

- **Controllers**  
  Recebem requisições HTTP, validam entrada e retornam resposta

- **Use Cases**  
  Contêm as regras de negócio da aplicação

- **Repositories**  
  Definem contratos de acesso a dados

- **Prisma Repositories**  
  Implementações reais com PostgreSQL

- **In-memory Repositories**  
  Utilizados para testes unitários

---

### 🔄 Fluxo da aplicação

1. A requisição chega na rota
2. O controller valida os dados
3. O controller chama um use case
4. O use case aplica as regras de negócio
5. O repositório acessa o banco via Prisma

---

## 🧰 Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Redis
- Zod
- JWT
- Vitest
- Supertest
- Docker Compose

---

## 🐳 Como rodar com Docker

O projeto utiliza Docker Compose para subir o banco de dados PostgreSQL.

### 📋 Pré-requisitos

- Docker
- Docker Compose
- Node.js
- npm

---

### 1. Clonar o repositório


git clone <url-do-repositorio> 
cd checkin-service


2. Instalar dependências
npm install

4. Criar arquivo .env
cp .env.example .env

Exemplo:

`NODE_ENV=dev
JWT_SECRET=uma_chave_segura
PORT=3334
DATABASE_URL="postgresql://docker:docker@localhost:5432/apigyss_bd?schema=public"`

4. Subir o banco com Docker
`docker-compose up -d`

6. Rodar migrações
`npx prisma migrate deploy`

8. Rodar a API
`npm run dev`

A aplicação estará disponível em:
http://localhost:3334

🧪 Testes
🔹 Testes unitários
- Testam regras de negócio isoladas
- Utilizam repositórios em memória
 `npm run test`

🔹 Testes E2E
- Testam a API ponta a ponta
- Utilizam banco PostgreSQL real

📌 Estratégia:

Banco isolado por arquivo de teste
Migrações executadas automaticamente
Ambiente destruído ao final
npm run test:e2e

📊 Cobertura de testes
npm run test:coverage

🎯 Próximos passos
- Observabilidade (logs, métricas, tracing)
- Testes de carga
- Deploy em ambiente cloud
- Avaliação de uso de filas (RabbitMQ/Kafka)

📌 Objetivo do projeto
Este projeto foi desenvolvido com foco em:

Aplicação de regras de negócio reais
Boas práticas de arquitetura
Preparação para cenários de escala
Simulação de problemas comuns em produção (cache, idempotência, etc)

---
