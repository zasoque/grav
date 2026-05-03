curl -X POST http://localhost:5173/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{
        "username": "testuser",
        "password": "testpassword"
    }'
