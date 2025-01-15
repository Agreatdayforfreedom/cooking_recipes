FROM node:lts-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

RUN npm install -g pnpm

RUN pnpm i

RUN pnpm dlx prisma generate

COPY . .

EXPOSE 4000