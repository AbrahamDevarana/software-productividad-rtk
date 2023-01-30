FROM node:19.0-alpine as build-stage

# Create app directory
WORKDIR /app-cliente

# Install app dependencies

COPY . .
RUN npm install
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.17.1-alpine as production-stage
COPY --from=build-stage /app-cliente/dist /usr/share/nginx/html
EXPOSE 80


#serve app with nginx

CMD ["nginx", "-g", "daemon off;"]
