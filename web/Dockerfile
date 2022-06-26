# Currently Frontity doesn't work with Node higher than 16
ARG NODE_IMAGE_TAG=16.15.1-alpine3.16

# Install dependencies only when needed
FROM node:$NODE_IMAGE_TAG AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci --only-production

# Rebuild the source code only when needed
FROM node:$NODE_IMAGE_TAG AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./ ./

RUN npm run build

# Production image, copy all the files and run next
FROM node:$NODE_IMAGE_TAG AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S frontity -u 1001

COPY --from=builder /app/build/ ./build/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js

USER frontity

EXPOSE 3000

ENV PORT=3000 \
    WEB_WORDPRESS_URL=http://localhost:80

CMD ["node", "server.js"]
