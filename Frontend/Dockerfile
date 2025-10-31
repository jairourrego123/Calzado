FROM node:20-slim AS build
WORKDIR /stock

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install --silent

# Copiar el código de la aplicación y construir
COPY . ./
RUN npm run build

# Production environment
FROM nginx:stable-alpine

# Copiar los archivos construidos de la etapa de construcción a nginx
COPY --from=build /stock/build /usr/share/nginx/html/stock

# Copiar configuración personalizada de nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]