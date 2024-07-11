ARG NODE_VERSION=20.14

FROM node:${NODE_VERSION}-alpine AS base

RUN apk add --no-cache make gcc g++ python3

RUN npm install turbo@latest --global

FROM base AS pruned

WORKDIR /app
COPY . .
RUN turbo prune --scope=server --docker

FROM base AS installer

WORKDIR /app
COPY --from=pruned /app/out/json/ .
COPY --from=pruned /app/out/package-lock.json ./package-lock.json
RUN npm install
COPY --from=pruned /app/out/full/ .
RUN turbo run build --filter=server^...

FROM base AS runner

WORKDIR /app
COPY --from=installer /app .
COPY ./makefile .

WORKDIR /app/apps/server
RUN npx prisma generate
