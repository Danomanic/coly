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

## Building a REST API in Java

We'll use **Spring Boot**, the most popular framework for building Java applications.

### Setting Up Spring Boot

Create a new Spring Boot project at [start.spring.io](https://start.spring.io/) with these dependencies:
- Spring Web
- Spring Boot DevTools

### Example: User API

#### 1. Create a Model

```java
public class User {
    private Long id;
    private String name;
    private String email;

    // Constructors, getters, and setters
    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters and setters...
}
```

#### 2. Create a Controller

```java
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private List<User> users = new ArrayList<>();

    // GET all users
    @GetMapping
    public List<User> getAllUsers() {
        return users;
    }

    // GET user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return users.stream()
            .filter(user -> user.getId().equals(id))
            .findFirst()
            .orElse(null);
    }

    // POST create new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        users.add(user);
        return user;
    }

    // PUT update user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        // Implementation here
        return updatedUser;
    }

    // DELETE user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        users.removeIf(user -> user.getId().equals(id));
    }
}
```

## API Best Practices

1. **Use Nouns, Not Verbs**: `/users` not `/getUsers`
2. **Use Plural Names**: `/users` not `/user`
3. **Use HTTP Status Codes**:
   - 200: Success
   - 201: Created
   - 400: Bad Request
   - 404: Not Found
   - 500: Server Error
4. **Version Your API**: `/api/v1/users`
5. **Use Consistent Naming**: camelCase or snake_case, but be consistent

## Testing APIs

You can test APIs using:
- **Postman**: GUI tool for testing APIs
- **cURL**: Command-line tool
- **JUnit + MockMvc**: For automated tests

### Example with cURL

```bash
# GET all users
curl http://localhost:8080/api/users

# POST create user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

## Practice Exercise

Build a REST API for a simple blog system with:
1. Posts (title, content, author)
2. Comments (post_id, author, content)
3. CRUD operations for both

## Next Steps

Learn about API security, authentication, and authorization in the next lesson.
