#stage 1
FROM node:lts-alpine3.14 as node
WORKDIR /app
COPY . .
RUN rm package-lock.json
RUN npm install -g npm@8.5.1
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli
RUN ng add @angular/material
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html