---
sidebar_position: 4
---

# Testing APIs with REST Assured

Learn how to write expressive, readable API tests using REST Assured - a powerful Java library for testing REST services.

## What is REST Assured?

REST Assured is a Java library that provides a fluent, domain-specific language (DSL) for testing REST APIs. It makes writing API tests feel natural and readable.

Compare traditional HTTP client code:

```java
// Without REST Assured - verbose and hard to read
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://localhost:8080/api/users/1"))
    .GET()
    .build();
HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
assertEquals(200, response.statusCode());
```

With REST Assured:

```java
// With REST Assured - clean and expressive
given()
    .baseUri("http://localhost:8080")
.when()
    .get("/api/users/1")
.then()
    .statusCode(200);
```

## Project Setup

Add REST Assured to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

Add static imports for cleaner syntax:

```java
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
```

## The Given-When-Then Pattern

REST Assured follows the BDD (Behaviour Driven Development) pattern:

| Section | Purpose | Example |
|---------|---------|---------|
| `given()` | Set up the request (headers, body, params) | Authentication, request body |
| `when()` | Execute the HTTP action | GET, POST, PUT, DELETE |
| `then()` | Validate the response | Status code, body content |

## Basic GET Request

Test that an endpoint returns the expected data:

```java
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class UserApiTest {

    @Test
    public void shouldReturnUserById() {
        given()
            .baseUri("http://localhost:8080")
        .when()
            .get("/api/users/1")
        .then()
            .statusCode(200)
            .body("id", equalTo(1))
            .body("name", equalTo("John Doe"))
            .body("email", containsString("@"));
    }
}
```

## Testing POST Requests

Send JSON data and validate the response:

```java
@Test
public void shouldCreateNewUser() {
    String requestBody = """
        {
            "name": "Jane Smith",
            "email": "jane@example.com"
        }
        """;

    given()
        .baseUri("http://localhost:8080")
        .contentType("application/json")
        .body(requestBody)
    .when()
        .post("/api/users")
    .then()
        .statusCode(201)
        .body("name", equalTo("Jane Smith"))
        .body("id", notNullValue());
}
```

### Using Java Objects

Map Java objects directly instead of raw JSON:

```java
@Test
public void shouldCreateUserFromObject() {
    User newUser = new User();
    newUser.setName("Jane Smith");
    newUser.setEmail("jane@example.com");

    given()
        .baseUri("http://localhost:8080")
        .contentType("application/json")
        .body(newUser)
    .when()
        .post("/api/users")
    .then()
        .statusCode(201)
        .body("name", equalTo("Jane Smith"));
}
```

## Testing PUT and DELETE

Update and delete operations:

```java
@Test
public void shouldUpdateUser() {
    String updateBody = """
        {
            "name": "John Updated",
            "email": "john.updated@example.com"
        }
        """;

    given()
        .baseUri("http://localhost:8080")
        .contentType("application/json")
        .body(updateBody)
    .when()
        .put("/api/users/1")
    .then()
        .statusCode(200)
        .body("name", equalTo("John Updated"));
}

@Test
public void shouldDeleteUser() {
    given()
        .baseUri("http://localhost:8080")
    .when()
        .delete("/api/users/1")
    .then()
        .statusCode(204);
}
```

## Validating JSON Responses

REST Assured provides powerful JSON validation using JSONPath and Hamcrest matchers:

```java
@Test
public void shouldValidateUserListResponse() {
    given()
        .baseUri("http://localhost:8080")
    .when()
        .get("/api/users")
    .then()
        .statusCode(200)
        .body("size()", greaterThan(0))           // List has items
        .body("[0].name", notNullValue())          // First item has name
        .body("name", hasItem("John Doe"))         // List contains user
        .body("findAll { it.active == true }.size()", greaterThan(0)); // Filter
}
```

### Common Hamcrest Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| `equalTo()` | Exact match | `body("name", equalTo("John"))` |
| `containsString()` | Substring match | `body("email", containsString("@"))` |
| `hasItem()` | List contains item | `body("tags", hasItem("admin"))` |
| `hasSize()` | List size | `body("users", hasSize(5))` |
| `greaterThan()` | Numeric comparison | `body("count", greaterThan(0))` |
| `notNullValue()` | Not null | `body("id", notNullValue())` |
| `nullValue()` | Is null | `body("deletedAt", nullValue())` |

## Query Parameters and Headers

Add query parameters and custom headers:

```java
@Test
public void shouldFilterUsersByStatus() {
    given()
        .baseUri("http://localhost:8080")
        .queryParam("status", "active")
        .queryParam("limit", 10)
        .header("Accept", "application/json")
    .when()
        .get("/api/users")
    .then()
        .statusCode(200)
        .body("size()", lessThanOrEqualTo(10));
}
```

## Authentication

### Basic Authentication

```java
@Test
public void shouldAuthenticateWithBasicAuth() {
    given()
        .baseUri("http://localhost:8080")
        .auth().basic("username", "password")
    .when()
        .get("/api/protected/resource")
    .then()
        .statusCode(200);
}
```

### Bearer Token

```java
@Test
public void shouldAuthenticateWithBearerToken() {
    String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

    given()
        .baseUri("http://localhost:8080")
        .header("Authorization", "Bearer " + token)
    .when()
        .get("/api/protected/resource")
    .then()
        .statusCode(200);
}
```

## Extracting Response Data

Extract values from responses for use in subsequent tests:

```java
@Test
public void shouldExtractCreatedUserId() {
    String requestBody = """
        {
            "name": "New User",
            "email": "new@example.com"
        }
        """;

    // Create user and extract the ID
    int userId = given()
        .baseUri("http://localhost:8080")
        .contentType("application/json")
        .body(requestBody)
    .when()
        .post("/api/users")
    .then()
        .statusCode(201)
        .extract()
        .path("id");

    // Use extracted ID in follow-up request
    given()
        .baseUri("http://localhost:8080")
    .when()
        .get("/api/users/" + userId)
    .then()
        .statusCode(200)
        .body("name", equalTo("New User"));
}
```

## Test Configuration

### Base URI Configuration

Set up common configuration to avoid repetition:

```java
import org.junit.jupiter.api.BeforeAll;
import io.restassured.RestAssured;

public class ApiTestBase {

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = "http://localhost:8080";
        RestAssured.basePath = "/api";
    }
}
```

Now tests are cleaner:

```java
public class UserApiTest extends ApiTestBase {

    @Test
    public void shouldReturnUser() {
        when()
            .get("/users/1")
        .then()
            .statusCode(200);
    }
}
```

### Request and Response Logging

Enable logging for debugging:

```java
@Test
public void shouldLogRequestAndResponse() {
    given()
        .log().all()              // Log request details
    .when()
        .get("/api/users/1")
    .then()
        .log().ifError()          // Log response only on failure
        .statusCode(200);
}
```

Logging options:
- `log().all()` - Log everything
- `log().body()` - Log only the body
- `log().headers()` - Log only headers
- `log().ifError()` - Log only when test fails

## Testing Error Responses

Verify your API handles errors correctly:

```java
@Test
public void shouldReturn404ForNonExistentUser() {
    given()
        .baseUri("http://localhost:8080")
    .when()
        .get("/api/users/99999")
    .then()
        .statusCode(404)
        .body("error", equalTo("User not found"));
}

@Test
public void shouldReturn400ForInvalidInput() {
    String invalidBody = """
        {
            "name": "",
            "email": "not-an-email"
        }
        """;

    given()
        .baseUri("http://localhost:8080")
        .contentType("application/json")
        .body(invalidBody)
    .when()
        .post("/api/users")
    .then()
        .statusCode(400)
        .body("errors", hasItem(containsString("email")));
}
```

## Integration with Spring Boot

Run REST Assured tests against a running Spring Boot application:

```java
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserApiIntegrationTest {

    @LocalServerPort
    private int port;

    @Test
    public void shouldCreateAndRetrieveUser() {
        RestAssured.port = port;

        // Create user
        int userId = given()
            .contentType("application/json")
            .body("{\"name\": \"Test User\", \"email\": \"test@example.com\"}")
        .when()
            .post("/api/users")
        .then()
            .statusCode(201)
            .extract()
            .path("id");

        // Retrieve user
        when()
            .get("/api/users/" + userId)
        .then()
            .statusCode(200)
            .body("name", equalTo("Test User"));
    }
}
```

## Practice Exercise

Write REST Assured tests for a Product API:

1. Test `GET /api/products` returns a list of products
2. Test `POST /api/products` creates a new product with name and price
3. Test `GET /api/products/{id}` returns a single product
4. Test `GET /api/products?category=electronics` filters by category
5. Test `DELETE /api/products/{id}` returns 204 No Content
6. Test `GET /api/products/99999` returns 404 for non-existent product

**Bonus**: Create a base test class with common configuration and use `@BeforeAll` to set up the base URI.

## Key Takeaways

- REST Assured provides a fluent, readable DSL for API testing
- Use the given-when-then pattern to structure tests clearly
- Hamcrest matchers enable powerful response validation
- Extract response data to chain requests together
- Configure base URI and logging in a base test class
- Integrate with Spring Boot using `@SpringBootTest` and random ports

## Next Steps

Now that you can build and test REST APIs, explore securing your APIs with authentication and authorisation.
