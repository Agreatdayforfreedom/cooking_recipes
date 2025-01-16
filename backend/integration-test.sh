#!/usr/bin/env bash

if pnpm --global list | grep -q dotenv-cli; then
  dotenv -e .env.test -- pnpm dlx prisma migrate deploy
  if [ "$#" -eq  "0" ]
    then
      pnpm dlx vitest
    else
      pnpm dlx vitest run
  fi
else
  pnpm add -g dotenv-cli
fi
