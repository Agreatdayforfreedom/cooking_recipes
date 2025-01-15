#!/usr/bin/env bash

if pnpm --global list | grep -q dotenv-cli; then
  dotenv -e .env.test -- pnpm dlx prisma migrate deploy
  pnpm dlx vitest
else
  pnpm add -g dotenv-cli
fi
