# Multi-stage Dockerfile for Kalimtak

# Frontend build stage
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Backend build stage
FROM python:3.11-slim AS backend-builder
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# Final stage
FROM python:3.11-slim
WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Copy backend
COPY --from=backend-builder /app /app/backend

# Copy frontend build
COPY --from=frontend-builder /app/dist /app/frontend/dist

# Install all dependencies
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Expose ports
EXPOSE 3000 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/ || exit 1

# Default command
CMD ["npm", "run", "dev"]