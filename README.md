# Development

Application running by NestJS and PostgreSQL

## Environment

```bash
# Copy env variables
$ cp .env.dev .env
```

## Database

Running postgres then create database name `novel_db`

```bash
# start docker
$ docker compose up postgres

# running container
$ docker exec -it postgres psql -U postgres

# create database if not exist
$ CREATE DATABASE novel_db;
```

## Data and Migrations (If needed)

```bash
# create migration
$ npx prisma migrate dev

# generate migration
$ npx prisma db seed

# read database
$ npx prisma studio
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# development
$ npm run start

# production mode
$ npm run build && npm run start:prod
```
