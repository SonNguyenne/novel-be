# Use a specific Node.js version
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies without dev dependencies
RUN npm install --omit-dev

# Copy the entire project to the working directory
COPY . .

RUN npx prisma generate
RUN npm run build


FROM node:20

# Copy node_modules and other necessary files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Set the command to start the application
EXPOSE 3334

CMD [ "npm", "run", "start:migrate:prod" ]
