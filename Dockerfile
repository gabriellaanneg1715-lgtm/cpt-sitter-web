# Stage 1: Build and Serve the full-stack application
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install

COPY . .
RUN npm run build

# Set NODE_ENV to production so the server serves the built static files
ENV NODE_ENV=production

# Cloud Run uses port 8080 by default
EXPOSE 8080

CMD ["npm", "start"]
