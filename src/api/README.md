# Config-Manager API

## Description

It's an API built with [Nestjs](http://nestjs.com/) for managing a simple CRUD configuration system (key-value)
You can see all endpoints in [OpenAPI endpoint](http://localhost:3000/api)

The purpose it's to have a base of code to play and test with Hexagonal/Clean Architectures in TypeScript and
learn more about that 🙂.

## Architecture

TDB (explain api-contract, modules and use of dependency-cruiser)

## How to run the app

1. Copy `env.example` file (with all env variables) and rename the file to `.env`
2. Start docker services with `yarn start:services`
3. Install dependencies and start the api for development

```bash
$ yarn install
$ yarn dev
```

4. [optional] Build the app with `yarn build`

## How to run linter & tests

```bash
$ yarn lint
$ yarn test:coverage
```
