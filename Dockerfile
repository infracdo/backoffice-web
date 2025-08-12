
# Multi-stage Dockerfile for React app
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY ./nginx.conf /etc/nginx/conf.d/app.conf
EXPOSE 5081
CMD ["nginx", "-g", "daemon off;"]
