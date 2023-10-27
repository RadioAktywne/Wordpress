# Currently Frontity doesn't work with Node higher than 16
FROM node:16.15.1-alpine3.16 AS base

WORKDIR /app/

# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat

COPY ./package.json ./package-lock.json ./

RUN npm ci --only-production

# Rebuild the source code only when needed
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY ./ ./

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs && adduser -S frontity -u 1001

COPY --from=builder /app/build/ ./build/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js

USER frontity

EXPOSE 20003

ENV WEB_PUBLIC_URL=https://radioaktywne.pl \
    WEB_WORDPRESS_PUBLIC_URL=http://localhost:20000

CMD ["node", "server.js"]
