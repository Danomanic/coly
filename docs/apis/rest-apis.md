---
sidebar_position: 2
---

# RESTful APIs

Learn how to build and consume REST APIs - the backbone of modern web applications.

## What is an API?

An API (Application Programming Interface) is a way for different software applications to communicate with each other.

Think of it like a waiter in a restaurant:
- You (the client) tell the waiter what you want
- The waiter takes your order to the kitchen (the server)
- The kitchen prepares your food
- The waiter brings it back to you

## What is REST?

REST (Representational State Transfer) is an architectural style for designing APIs. RESTful APIs use:

- **HTTP methods** (GET, POST, PUT, DELETE)
- **URLs** to identify resources
- **JSON** for data format (usually)
- **Stateless** communication

## HTTP Methods

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Retrieve data | Get list of users |
| POST | Create new data | Create a new user |
| PUT | Update existing data | Update user details |
| DELETE | Remove data | Delete a user |

## HTTP Status Codes

Understanding status codes is essential for building robust APIs:

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, or DELETE |
| 201 | Created | Successful POST that creates a resource |
| 400 | Bad Request | Invalid request data or format |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Something went wrong on the server |

## API Best Practices

1. **Use Nouns, Not Verbs**: `/users` not `/getUsers`
2. **Use Plural Names**: `/users` not `/user`
3. **Use Appropriate HTTP Status Codes**: Return the correct status code for each operation
4. **Version Your API**: `/api/v1/users` to allow future changes without breaking existing clients
5. **Use Consistent Naming**: Choose camelCase or snake_case and stick with it throughout your API
6. **Filter, Sort, and Paginate**: For large datasets, use query parameters like `?page=1&limit=10&sort=name`
7. **Provide Clear Error Messages**: Return helpful error messages in a consistent format

## Testing APIs

There are several tools available for testing REST APIs:

### 1. Postman

**Postman** is a popular GUI application for testing APIs:
- Visual interface for building requests
- Save and organize requests into collections
- Test automation and scripting
- Environment variables for different configurations

**Download**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

### 2. cURL

**cURL** is a command-line tool available on most systems:

```bash
# GET all users
curl http://localhost:8080/api/users

# POST create user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# PUT update user
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'

# DELETE user
curl -X DELETE http://localhost:8080/api/users/1
```

### 3. Browser DevTools

For GET requests, you can use your browser's developer tools:
1. Open DevTools (F12)
2. Go to the Network tab
3. Navigate to your API endpoint
4. Inspect the request and response

### 4. Automated Testing

For production applications, write automated tests:
- **Unit tests**: Test individual components
- **Integration tests**: Test API endpoints with a test database
- **End-to-end tests**: Test complete user workflows

## Real-World API Example

Here's what a typical API response looks like:

**Request:**
```
GET /api/users/1
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

## Practice Exercise

Design a REST API for a simple blog system. Think about:
1. What resources do you need? (Posts, Comments, Users)
2. What endpoints would you create?
3. Which HTTP methods would you use for each operation?
4. What would the JSON response structure look like?

**Example Design:**
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a specific post
- `GET /api/posts/:id/comments` - Get comments for a post

## Next Steps

Ready to build your own REST API? Learn how to implement one in Java with Spring Boot in the next lesson.
