FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_MESTHI_API_URL=https://api.mesthi.com
ARG VITE_MESTHI_API_VERSION=1.12.2
ENV VITE_MESTHI_API_URL=$VITE_MESTHI_API_URL
ENV VITE_MESTHI_API_VERSION=$VITE_MESTHI_API_VERSION
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/healthz || exit 1
