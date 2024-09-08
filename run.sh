#!/bin/bash

./gradlew :build -x test

docker-compose up -d

curl -X POST http://localhost:8080/auth/sign-up \
-H "Content-Type: application/json" \
-d '{
  "firstname": "Fatih",
  "surname": "Ayar",
  "mail": "fayar@example.com",
  "password": "password",
  "agent": "Agent001",
  "photo": "https://avatars.githubusercontent.com/u/18555532?v=4",
  "role": "ADMIN"
}'