---
sidebar_position: 4
---

# Component Testing

Learn how to test entire services as black boxes, verifying they work correctly at their boundaries.

## What is Component Testing?

Component tests treat a service as a black box, testing it through its public interfaces (APIs, message queues) without knowledge of internal implementation. They sit between integration tests and end-to-end tests in the testing pyramid.

```
┌─────────────────────────────────────────┐
│           Component Test                │
│                                         │
│    ┌─────────────────────────────┐      │
│    │      Your Service           │      │
│    │  ┌─────┐  ┌─────┐  ┌─────┐  │      │
│    │  │ API │  │Logic│  │ DB  │  │      │
│    │  └─────┘  └─────┘  └─────┘  │      │
│    └─────────────────────────────┘      │
│              ▲                          │
│              │ HTTP Requests            │
│    ┌─────────┴─────────┐                │
│    │   Test Client     │                │
│    └───────────────────┘                │
└─────────────────────────────────────────┘
```

| Aspect | Integration Test | Component Test |
|--------|------------------|----------------|
| Scope | Internal interactions | Entire service |
| Interface | Java method calls | HTTP/messaging |
| Dependencies | May be mocked | Containerised or mocked |
| Perspective | White box (knows internals) | Black box (external view) |

## Why Component Testing?

- **Confidence**: Test the service as consumers will use it
- **Refactoring Safety**: Change internals without breaking tests
- **Documentation**: Tests demonstrate real API behaviour
- **Contract Verification**: Ensure the service meets its API contract

## Setting Up Component Tests

### Project Structure

```
src/
├── main/java/
│   └── com/example/orderservice/
├── test/java/
│   └── com/example/orderservice/
│       ├── unit/           # Unit tests
│       ├── integration/    # Integration tests
│       └── component/      # Component tests
└── pom.xml
```

### Dependencies

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>testcontainers</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>postgresql</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## Writing Component Tests

### Basic Component Test

Test the service through its REST API:

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Testcontainers
class OrderServiceComponentTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15");

    @DynamicPropertySource
    static void configureDatabase(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void shouldCreateOrder() {
        String requestBody = """
            {
                "customerId": "CUST-001",
                "items": [
                    {"productId": "PROD-001", "quantity": 2, "price": 29.99}
                ]
            }
            """;

        given()
            .contentType("application/json")
            .body(requestBody)
        .when()
            .post("/api/orders")
        .then()
            .statusCode(201)
            .body("id", notNullValue())
            .body("customerId", equalTo("CUST-001"))
            .body("status", equalTo("PENDING"))
            .body("total", equalTo(59.98f));
    }
}
```

### Testing Complete Workflows

Test multi-step business processes:

```java
@Test
void shouldCompleteOrderLifecycle() {
    // Step 1: Create order
    String orderId = given()
        .contentType("application/json")
        .body(createOrderRequest())
    .when()
        .post("/api/orders")
    .then()
        .statusCode(201)
        .extract()
        .path("id");

    // Step 2: Verify order is pending
    given()
    .when()
        .get("/api/orders/" + orderId)
    .then()
        .statusCode(200)
        .body("status", equalTo("PENDING"));

    // Step 3: Process payment
    given()
        .contentType("application/json")
        .body("{\"orderId\": \"" + orderId + "\", \"amount\": 59.98}")
    .when()
        .post("/api/payments")
    .then()
        .statusCode(200);

    // Step 4: Verify order is now paid
    given()
    .when()
        .get("/api/orders/" + orderId)
    .then()
        .statusCode(200)
        .body("status", equalTo("PAID"));
}
```

## Mocking External Services

Use WireMock to simulate external dependencies:

### Setup WireMock

```xml
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock-standalone</artifactId>
    <version>3.3.1</version>
    <scope>test</scope>
</dependency>
```

### Mocking External APIs

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Testcontainers
class OrderServiceWithExternalDependencyTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15");

    static WireMockServer paymentGateway;

    @BeforeAll
    static void startWireMock() {
        paymentGateway = new WireMockServer(WireMockConfiguration.wireMockConfig()
            .dynamicPort());
        paymentGateway.start();
    }

    @AfterAll
    static void stopWireMock() {
        paymentGateway.stop();
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("payment.gateway.url",
            () -> "http://localhost:" + paymentGateway.port());
    }

    @Test
    void shouldProcessPaymentSuccessfully() {
        // Stub the payment gateway response
        paymentGateway.stubFor(post(urlEqualTo("/api/charge"))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "application/json")
                .withBody("{\"transactionId\": \"TXN-123\", \"status\": \"SUCCESS\"}")));

        // Create and pay for order
        String orderId = createTestOrder();

        given()
            .contentType("application/json")
            .body("{\"orderId\": \"" + orderId + "\", \"amount\": 59.98}")
        .when()
            .post("/api/orders/" + orderId + "/pay")
        .then()
            .statusCode(200)
            .body("paymentStatus", equalTo("SUCCESS"));

        // Verify the payment gateway was called
        paymentGateway.verify(postRequestedFor(urlEqualTo("/api/charge"))
            .withRequestBody(containing("59.98")));
    }

    @Test
    void shouldHandlePaymentGatewayFailure() {
        // Stub a failure response
        paymentGateway.stubFor(post(urlEqualTo("/api/charge"))
            .willReturn(aResponse()
                .withStatus(500)
                .withBody("{\"error\": \"Gateway unavailable\"}")));

        String orderId = createTestOrder();

        given()
            .contentType("application/json")
            .body("{\"orderId\": \"" + orderId + "\", \"amount\": 59.98}")
        .when()
            .post("/api/orders/" + orderId + "/pay")
        .then()
            .statusCode(503)
            .body("error", containsString("Payment failed"));
    }
}
```

## Testing Message-Driven Services

For services that consume messages:

```java
@SpringBootTest
@Testcontainers
class OrderEventConsumerComponentTest {

    @Container
    static KafkaContainer kafka = new KafkaContainer(
        DockerImageName.parse("confluentinc/cp-kafka:7.5.0"));

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15");

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private OrderRepository orderRepository;

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.kafka.bootstrap-servers", kafka::getBootstrapServers);
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
    }

    @Test
    void shouldProcessOrderCreatedEvent() throws Exception {
        String event = """
            {
                "eventType": "ORDER_CREATED",
                "orderId": "ORD-001",
                "customerId": "CUST-001",
                "total": 99.99
            }
            """;

        // Publish event
        kafkaTemplate.send("orders", event).get();

        // Wait for processing and verify
        await().atMost(Duration.ofSeconds(10))
            .untilAsserted(() -> {
                Optional<Order> order = orderRepository.findByOrderId("ORD-001");
                assertTrue(order.isPresent());
                assertEquals("CUST-001", order.get().getCustomerId());
            });
    }
}
```

## Test Data Management

### Database Cleanup

Ensure clean state between tests:

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Testcontainers
class OrderServiceComponentTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void cleanDatabase() {
        jdbcTemplate.execute("TRUNCATE TABLE orders CASCADE");
        jdbcTemplate.execute("TRUNCATE TABLE order_items CASCADE");
    }

    // Tests start with empty database
}
```

### Seeding Test Data

```java
@BeforeEach
void seedTestData() {
    jdbcTemplate.execute("""
        INSERT INTO customers (id, name, email) VALUES
        ('CUST-001', 'John Doe', 'john@example.com'),
        ('CUST-002', 'Jane Smith', 'jane@example.com')
        """);
}
```

## Base Test Class

Create a reusable base class:

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Testcontainers
public abstract class ComponentTestBase {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withReuse(true);  // Reuse container across test classes

    @LocalServerPort
    protected int port;

    @Autowired
    protected JdbcTemplate jdbcTemplate;

    @DynamicPropertySource
    static void configureDatabase(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        RestAssured.basePath = "/api";
        cleanDatabase();
    }

    protected void cleanDatabase() {
        jdbcTemplate.execute("TRUNCATE TABLE orders CASCADE");
    }

    protected String createOrder(String customerId, double total) {
        return given()
            .contentType("application/json")
            .body(String.format(
                "{\"customerId\": \"%s\", \"total\": %.2f}", customerId, total))
        .when()
            .post("/orders")
        .then()
            .statusCode(201)
            .extract()
            .path("id");
    }
}
```

Usage:

```java
class OrderApiTest extends ComponentTestBase {

    @Test
    void shouldRetrieveOrder() {
        String orderId = createOrder("CUST-001", 99.99);

        given()
        .when()
            .get("/orders/" + orderId)
        .then()
            .statusCode(200)
            .body("customerId", equalTo("CUST-001"));
    }
}
```

## Best Practices

### Test Real Behaviour

Focus on observable behaviour, not implementation:

```java
// Good - tests observable outcome
@Test
void shouldApplyDiscountToLargeOrders() {
    given()
        .contentType("application/json")
        .body("{\"items\": [...], \"total\": 500.00}")
    .when()
        .post("/api/orders")
    .then()
        .body("discount", equalTo(50.00f))
        .body("finalTotal", equalTo(450.00f));
}

// Avoid - testing internal implementation
@Test
void shouldCallDiscountServiceForLargeOrders() { }  // Implementation detail
```

### Test Error Scenarios

```java
@Test
void shouldReturnValidationErrors() {
    given()
        .contentType("application/json")
        .body("{\"customerId\": null, \"items\": []}")
    .when()
        .post("/api/orders")
    .then()
        .statusCode(400)
        .body("errors", hasItem(containsString("customerId")))
        .body("errors", hasItem(containsString("items")));
}
```

### Keep Tests Independent

Each test should work in isolation:

```java
// Each test creates its own data
@Test
void shouldCancelOrder() {
    String orderId = createOrder("CUST-001", 99.99);

    given()
    .when()
        .post("/orders/" + orderId + "/cancel")
    .then()
        .statusCode(200);
}
```

## Practice Exercise

Write component tests for a Product Catalog service:

1. Test `POST /api/products` creates a new product
2. Test `GET /api/products` returns all products
3. Test `GET /api/products?category=electronics` filters by category
4. Test `PUT /api/products/{id}` updates a product
5. Test `DELETE /api/products/{id}` removes a product
6. Test that creating a product with duplicate SKU returns 409 Conflict

**Bonus**: Add WireMock to simulate an inventory service that your product catalog calls to check stock levels.

## Key Takeaways

- Component tests treat services as black boxes
- Test through public APIs (HTTP, messaging)
- Use Testcontainers for realistic database testing
- Use WireMock to simulate external services
- Focus on observable behaviour, not implementation
- Create base classes to reduce boilerplate

## Next Steps

Learn how to write tests in business language that stakeholders can understand with BDD Testing.
