FROM node:alpine3.11 as build-deps

ENV WORKDIR /usr/src/app

WORKDIR ${WORKDIR}

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8000
