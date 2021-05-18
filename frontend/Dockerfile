FROM node:14-alpine as build-deps

ENV WORKDIR /usr/src/app

WORKDIR ${WORKDIR}

COPY package.json yarn.lock ./

RUN yarn

COPY . .

ARG API_URL

ENV REACT_APP_API_URL=${API_URL}

EXPOSE 3000

RUN yarn build


FROM nginx:1.17.9-alpine

ENV WORKDIR /usr/src/app

WORKDIR ${WORKDIR}

COPY nginx.conf /etc/nginx/nginx.conf.template

COPY --from=build-deps ${WORKDIR}/build /var/www

COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
