# Stage 1: Build the Next.js application
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies separately to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the Next.js application in production
FROM node:alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

# Expose the Next.js port
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "run", "start"]
