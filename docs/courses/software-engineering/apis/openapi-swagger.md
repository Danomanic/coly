---
sidebar_position: 5
---

# OpenAPI and Swagger

Learn how to document your REST APIs using OpenAPI (formerly Swagger) - the industry standard for API documentation.

## What is OpenAPI?

OpenAPI is a specification for describing REST APIs in a machine-readable format (JSON or YAML). It allows you to:

- **Document** your API endpoints, parameters, and responses
- **Generate** interactive documentation automatically
- **Create** client SDKs in multiple languages
- **Validate** requests and responses against the specification

:::tip
OpenAPI was originally called Swagger. Today, "Swagger" refers to the tooling (Swagger UI, Swagger Editor), while "OpenAPI" is the specification itself.
:::

## Why Document Your API?

| Benefit | Description |
|---------|-------------|
| Developer Experience | Interactive docs let developers try your API instantly |
| Consistency | Single source of truth for frontend and backend teams |
| Code Generation | Generate client libraries automatically |
| Testing | Validate requests match the expected format |
| Onboarding | New team members understand the API quickly |

## Adding OpenAPI to Spring Boot

Spring Boot integrates seamlessly with OpenAPI through the `springdoc-openapi` library.

### 1. Add Dependencies

Add the following to your `pom.xml`:

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

For Gradle, add to `build.gradle`:

```groovy
implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'
```

### 2. Run Your Application

That's it! Start your Spring Boot application and navigate to:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`
- **OpenAPI YAML**: `http://localhost:8080/v3/api-docs.yaml`

Swagger UI provides an interactive interface where you can explore and test your API endpoints directly from the browser.

## Customising API Documentation

### Basic Configuration

Create a configuration class to customise the API information:

```java
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("User Management API")
                .version("1.0.0")
                .description("API for managing users in the system")
                .contact(new Contact()
                    .name("API Support")
                    .email("support@example.com"))
                .license(new License()
                    .name("Apache 2.0")
                    .url("https://www.apache.org/licenses/LICENSE-2.0")));
    }
}
```

### Configuring via Properties

You can also configure OpenAPI in `application.properties`:

```properties
# API documentation path
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html

# Display settings
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha

# Disable in production (optional)
springdoc.swagger-ui.enabled=true
```

## Documenting Your Endpoints

Use annotations to add detailed documentation to your controllers.

### Documenting a Controller

```java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "User management operations")
public class UserController {

    @Operation(summary = "Get all users", description = "Returns a list of all users in the system")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved users")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @Operation(summary = "Get user by ID", description = "Returns a single user by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}")
    public User getUserById(
            @Parameter(description = "ID of the user to retrieve", required = true)
            @PathVariable Long id) {
        return userService.findById(id);
    }

    @Operation(summary = "Create a new user", description = "Creates a new user with the provided details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @Operation(summary = "Delete a user", description = "Deletes a user by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "User deleted successfully"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("/{id}")
    public void deleteUser(
            @Parameter(description = "ID of the user to delete")
            @PathVariable Long id) {
        userService.deleteById(id);
    }
}
```

### Key Annotations

| Annotation | Purpose | Example |
|------------|---------|---------|
| `@Tag` | Groups related endpoints | `@Tag(name = "Users")` |
| `@Operation` | Describes an endpoint | `@Operation(summary = "Get all users")` |
| `@ApiResponse` | Documents a response code | `@ApiResponse(responseCode = "200")` |
| `@Parameter` | Describes a parameter | `@Parameter(description = "User ID")` |
| `@Schema` | Describes a model property | `@Schema(example = "john@example.com")` |

## Documenting Models

Add documentation to your data models using `@Schema`:

```java
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User entity representing a system user")
public class User {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @Schema(description = "User's full name", example = "John Doe", required = true)
    private String name;

    @Schema(description = "User's email address", example = "john@example.com", required = true)
    private String email;

    @Schema(description = "Whether the user account is active", defaultValue = "true")
    private boolean active;

    // Getters and setters
}
```

## Adding Authentication Documentation

Document your API's security requirements:

```java
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;

@Configuration
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT",
    description = "JWT authentication token"
)
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info().title("User API").version("1.0.0"))
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
```

Apply security to specific endpoints:

```java
@Operation(summary = "Get current user profile")
@SecurityRequirement(name = "bearerAuth")
@GetMapping("/me")
public User getCurrentUser() {
    return userService.getCurrentUser();
}
```

## Grouping APIs

For larger applications, group APIs into separate documentation pages:

```java
import org.springdoc.core.models.GroupedOpenApi;

@Configuration
public class OpenApiConfig {

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
            .group("public")
            .pathsToMatch("/api/public/**")
            .build();
    }

    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
            .group("admin")
            .pathsToMatch("/api/admin/**")
            .build();
    }
}
```

Access grouped documentation at:
- `http://localhost:8080/swagger-ui.html?urls.primaryName=public`
- `http://localhost:8080/swagger-ui.html?urls.primaryName=admin`

## Complete Example

Here's a complete example bringing together all the concepts:

### OpenAPI Configuration

```java
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT"
)
public class OpenApiConfig {

    @Bean
    public OpenAPI userManagementOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("User Management API")
                .description("REST API for managing users")
                .version("1.0.0"));
    }
}
```

### Documented Controller

```java
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "Operations for managing users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "List all users")
    @ApiResponse(responseCode = "200", description = "List of users returned")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @Operation(summary = "Get user by ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "User found"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Operation(summary = "Create new user")
    @ApiResponse(responseCode = "201", description = "User created")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @Operation(summary = "Update user")
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @Operation(summary = "Delete user")
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }
}
```

## OpenAPI Specification Format

The generated OpenAPI specification looks like this (YAML format):

```yaml
openapi: 3.0.1
info:
  title: User Management API
  description: REST API for managing users
  version: 1.0.0
paths:
  /api/users:
    get:
      tags:
        - Users
      summary: List all users
      responses:
        '200':
          description: List of users returned
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      tags:
        - Users
      summary: Create new user
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '201':
          description: User created
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        email:
          type: string
```

## Practice Exercise

Add OpenAPI documentation to your existing REST API:

1. Add the `springdoc-openapi` dependency to your project
2. Create an `OpenApiConfig` class with API title and description
3. Add `@Tag` annotations to group your controllers
4. Document at least 3 endpoints with `@Operation` and `@ApiResponse`
5. Add `@Schema` annotations to your model classes
6. Open Swagger UI and test your endpoints interactively

**Bonus**: Configure JWT authentication and mark protected endpoints with `@SecurityRequirement`.

## Key Takeaways

- OpenAPI provides a standard way to document REST APIs
- `springdoc-openapi` integrates seamlessly with Spring Boot
- Swagger UI generates interactive documentation automatically
- Use annotations to add descriptions, examples, and response codes
- Document security requirements for protected endpoints
- Group APIs for better organisation in larger projects

## Next Steps

Now that your API is well-documented, explore API versioning strategies and how to handle breaking changes gracefully.
