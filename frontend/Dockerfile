FROM node:alpine3.11 as build-deps

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY . /app/

EXPOSE 3000