FROM node:23-alpine AS builder
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

ARG MONGO_URL
ARG JWT_SECRET
ARG REDIS_URL
ENV MONGO_URL ${MONGO_URL}
ENV JWT_SECRET ${JWT_SECRET}
ENV REDIS_URL ${REDIS_URL}

CMD ["npx", "vite", "dev", "--host"]