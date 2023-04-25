FROM node:latest
COPY package*.json ./
WORKDIR /app
RUN NODE_ENV=development npm install --force
COPY . .
EXPOSE 3000
CMD ["npm", "start"]