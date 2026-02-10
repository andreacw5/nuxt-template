# Multi-stage build per ottimizzare le dimensioni dell'immagine

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Installa dipendenze di sistema necessarie per la build
RUN apk add --no-cache python3 make g++

# Copia i file di configurazione delle dipendenze
COPY package.json yarn.lock ./

# Installa le dipendenze usando Yarn Classic (v1) che corrisponde al formato yarn.lock
RUN yarn install --frozen-lockfile

# Copia il resto dell'applicazione
COPY . .

# Aumenta la memoria disponibile per Node.js durante la build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build dell'applicazione Nuxt
RUN yarn build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Copia solo i file necessari per la produzione
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package*.json /app/

# Imposta le variabili d'ambiente
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Espone la porta 3000
EXPOSE 3000

# Comando per avviare l'applicazione
CMD ["node", ".output/server/index.mjs"]

