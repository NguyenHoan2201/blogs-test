FROM node:16-slim AS service-base
RUN apt-get update -y && apt-get install -y openssl && apt-get install procps -y
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

FROM service-base AS service-dev
WORKDIR /app
EXPOSE 3000
