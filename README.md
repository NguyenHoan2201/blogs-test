# Blogs test

this repo consists of a nestjs backend and a reactjs frontend
with postgresql as database

for testing purposes, I don't want to implement data validation, some needed nestjs and configuration for production, responsive, ...

if you have nodejs 16+ installed on your machine and postgresql installed on your machine(debian base)
you can edit DATABASE_URL to any of your local database and run commands bellow

## config and run

```bash
$service: yarn install
$service: sudo service postgresql start
$service: npx prisma migrate dev # migrate your database
$service: yarn seed # create dummy data
$service: yarn dev


$ui: yarn install
$ui: yarn dev
```

or if you have docker installed on your machine

```bash
$blog-test: docker-compose -f docker-compose.dev.yml up -build
```
