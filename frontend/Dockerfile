FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./


RUN npm install -g pnpm

RUN pnpm config set store-dir /root/.pnpm-store

RUN pnpm i

COPY . .

EXPOSE 5173