FROM node:lts-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/


RUN npm install -g pnpm

RUN pnpm config set store-dir /root/.pnpm-store

RUN pnpm i

RUN pnpm dlx prisma generate

COPY . .

EXPOSE 4000