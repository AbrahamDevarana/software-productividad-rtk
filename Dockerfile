FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY src ./src  


RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

# run on development mode
CMD [ "npm", "run", "dev" ]

