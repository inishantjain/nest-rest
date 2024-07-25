

## Description

A Rest api for books and authors

## Installation
  1. Install dependencies
```bash
$ npm install
```
  2. Configure Prisma
```bash
$ npx prisma migrate dev --name init && npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## NestJS Takeaways

1. Nest uses IoC and for that it uses DI.
2. main.ts is the entry point which bootstraps the application.
3. In NestJS we work with modules app.module



