FROM node:alpine

WORKDIR /app

COPY package.json /app/
COPY src /app/src

RUN npm ci
