<<<<<<< HEAD
# Use a specific Node.js version
=======
>>>>>>> 9c8de5914bcf8a2f3f8e222bec7a2680fc68ce00
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./
COPY prisma ./prisma

<<<<<<< HEAD
# Install dependencies without dev dependencies
RUN npm install --omit-dev
=======
RUN npm install
RUN npx prisma generate
>>>>>>> 9c8de5914bcf8a2f3f8e222bec7a2680fc68ce00

# Copy the entire project to the working directory
COPY . .

RUN npm run build

<<<<<<< HEAD
=======
FROM node:20
>>>>>>> 9c8de5914bcf8a2f3f8e222bec7a2680fc68ce00

FROM node:20

# Copy node_modules and other necessary files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Set the command to start the application
EXPOSE 3334

<<<<<<< HEAD
# CMD [ "npm", "run", "start:migrate:prod" ]

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run start:prod
=======
CMD [ "npm", "run", "start:migrate:prod" ]
>>>>>>> 9c8de5914bcf8a2f3f8e222bec7a2680fc68ce00


