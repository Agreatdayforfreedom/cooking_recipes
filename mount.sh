#!/usr/bin/env bash

backend="terrand-backend-1"
db="terrand-postgres-1"
frontend="terrand-frontend-1"

if [ ! "$(docker ps -aq -f name=$backend)" ] || [ ! "$(docker ps -aq -f name=$db)" ] || [ ! "$(docker ps -aq -f name=$frontend)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=$backend)" ] || [ ! "$(docker ps -aq -f status=exited -f name=$db)" ] || [ ! "$(docker ps -aq -f status=exited -f name=$frontend)" ]; then
        docker rm $backend
        docker rm $db
        docker rm $frontend
    fi
    docker-compose up --build -d
    docker exec -it $backend pnpm dlx prisma migrate dev
fi