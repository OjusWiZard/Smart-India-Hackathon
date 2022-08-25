FROM node:16-slim AS build

WORKDIR /app

COPY package*.json ./

RUN yarn --silent

COPY . ./

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /var/www/app

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
