#!/bin/bash

echo "=== Testing SIGNUP ==="
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser789@example.com","password":"password123","fullName":"Test User"}'

echo -e "\n\n=== Testing LOGIN ==="
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser789@example.com","password":"password123"}'

