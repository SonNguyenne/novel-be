# Development

Application running by NestJS and PostgreSQL

## Environment

```bash
# Copy env variables
$ cp .env.template .env
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

# generate seed (If needed)
$ npx prisma db seed

# read database (If needed)
$ npx prisma studio
```

### Notes

```bash
# If you gonna change schema then you need run
$ npx prisma migrate dev
# or
$ npx prisma migrate dev --name ${name-migration}
# Then push the prisma/migration with source
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
