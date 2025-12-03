---
sidebar_position: 3
---

# Building a REST API in Java

Learn how to build RESTful APIs using Spring Boot, the most popular framework for Java web applications.

## Setting Up Spring Boot

Create a new Spring Boot project at [start.spring.io](https://start.spring.io/) with these dependencies:
- Spring Web
- Spring Boot DevTools

:::tip
Spring Boot simplifies Java development by providing auto-configuration and embedded servers, letting you focus on writing business logic.
:::

## Example: User API

Let's build a complete REST API for managing users with CRUD operations.

### 1. Create a Model

First, create a `User` class to represent our data:

```java
public class User {
    private Long id;
    private String name;
    private String email;

    // Constructors
    public User() {}

    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

### 2. Create a Controller

The controller handles HTTP requests and maps them to methods:

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
        User existingUser = getUserById(id);
        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            return existingUser;
        }
        return null;
    }

    // DELETE user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        users.removeIf(user -> user.getId().equals(id));
    }
}
```

### Understanding the Annotations

- `@RestController`: Marks the class as a REST API controller
- `@RequestMapping("/api/users")`: Base URL for all endpoints in this controller
- `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`: Maps HTTP methods to Java methods
- `@PathVariable`: Extracts values from the URL path
- `@RequestBody`: Converts JSON request body to Java object

## Testing with Spring Boot

For automated testing, use JUnit with MockMvc to test your REST endpoints without starting the full server.

### 1. Add Testing Dependencies

Add these to your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### 2. Create a Test Class

```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/api/users"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testCreateUser() throws Exception {
        String userJson = "{\"id\":1,\"name\":\"John Doe\",\"email\":\"john@example.com\"}";

        mockMvc.perform(post("/api/users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(userJson))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John Doe"))
            .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    public void testGetUserById() throws Exception {
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk());
    }

    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/api/users/1"))
            .andExpect(status().isOk());
    }
}
```

### Key Testing Concepts

- `@WebMvcTest`: Loads only the web layer for testing (faster than full integration tests)
- `MockMvc`: Simulates HTTP requests without starting the actual server
- `andExpect()`: Verifies response status, content type, and JSON values
- `jsonPath()`: Validates specific fields in JSON responses using JSONPath expressions

## Practice Exercise

Enhance the User API with:
1. Input validation (email format, required fields)
2. Proper HTTP status codes (201 for created, 404 for not found)
3. Exception handling with `@ExceptionHandler`
4. Add pagination for the GET all users endpoint

## Next Steps

Now that you can build REST APIs, learn about securing them with authentication and authorisation.
