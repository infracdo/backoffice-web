
# Multi-stage Dockerfile for React app
FROM node:16.20.2 AS build
WORKDIR /app

# Set build arguments with defaults from .env file
# These can be overridden at build time with --build-arg
ARG PORT=5552
ARG REACT_APP_API_URL=https://zeep-be-sbx.am1-aks.apolloglobal.net/api
ARG REACT_APP_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiemVlcF9pbnRlcm5hbF9rZXkifQ.Frxy0JZU8TejdQBbFSwszcmo7Qm8rtyb6tpdg1bJRTA

# Set environment variables for the build process
ENV PORT=$PORT
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_API_TOKEN=$REACT_APP_API_TOKEN

COPY package.json ./
# Copy package-lock.json if it exists
COPY package-lock.json* ./
RUN npm ci --legacy-peer-deps
COPY . .

# Build the React app with environment variables
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY ./nginx.conf /etc/nginx/conf.d/app.conf
EXPOSE 5081
CMD ["nginx", "-g", "daemon off;"]
