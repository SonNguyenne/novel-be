FROM node:20 AS builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --omit-dev

# Copy the entire project (including prisma)
COPY . .

# Ensure the prisma folder is copied
COPY prisma ./prisma/

# Build the project
RUN npm run build

# Generate prisma client
RUN npx prisma generate

FROM node:20

# Copy built files and node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3334

CMD [ "npm", "run", "start:migrate:prod" ]
