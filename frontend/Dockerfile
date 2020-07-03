FROM node:alpine3.11 as build-deps

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++

ENV WORKDIR /usr/src/app

WORKDIR ${WORKDIR}

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000