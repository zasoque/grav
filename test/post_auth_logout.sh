curl -X POST http://localhost:5173/api/auth/logout \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${TOKEN}"
