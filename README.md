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

## Data and Migrations

```bash
# create migration to generate table
$ npx prisma migrate dev


# generate migration (If needed)
$ npx prisma db seed

# read database (If needed)
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
