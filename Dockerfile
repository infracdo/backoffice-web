
# Multi-stage Dockerfile for React app
FROM node:16.20.2 AS build
WORKDIR /app
COPY package.json ./
# Copy package-lock.json if it exists
COPY package-lock.json* ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY ./nginx.conf /etc/nginx/conf.d/app.conf
EXPOSE 5081
CMD ["nginx", "-g", "daemon off;"]
