#!/bin/sh
echo "Running migrations..."
npx knex migrate:latest

echo "Running seeds..."
npx knex seed:run

echo "Starting server..."
node server.js