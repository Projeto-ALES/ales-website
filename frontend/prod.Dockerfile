# Building artifact
FROM node:alpine3.11 as build-deps

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build


# Serving frontend via nginx
FROM nginx:alpine

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
