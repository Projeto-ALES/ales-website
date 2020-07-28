FROM node:alpine3.11 as build-deps

WORKDIR /app

COPY package.json ./

RUN yarn

COPY ./ ./

EXPOSE 8000
