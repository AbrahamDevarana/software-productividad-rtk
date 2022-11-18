FROM node:19.0-alpine as build-stage

# Create app directory
WORKDIR /app/cliente

# Install app dependencies
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY src ./src  
COPY index.html ./
COPY tailwind.config.cjs ./
COPY postcss.config.cjs ./
COPY .env.development .env
RUN npm install
RUN npm run build
# Bundle app source
COPY . .

# Stage 1, based on NGINX to provide a configuration to be used with react-router
FROM nginx:alpine
COPY --from=build-stage /app/cliente/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80


# Run container as non-root user
CMD ["nginx", "-g", "daemon off;"]
