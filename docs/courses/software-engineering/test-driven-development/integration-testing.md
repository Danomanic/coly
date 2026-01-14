---
sidebar_position: 3
---

# Integration Testing

Learn how to test multiple components working together, including database interactions and external service calls.

## What is Integration Testing?

Integration tests verify that different parts of your application work correctly together. Unlike unit tests that isolate components, integration tests check the connections between them.

| Aspect | Unit Test | Integration Test |
|--------|-----------|------------------|
| Scope | Single class/method | Multiple components |
| Dependencies | Mocked | Real or embedded |
| Speed | Milliseconds | Seconds |
| Purpose | Logic correctness | Component interaction |

## Types of Integration Tests

### Database Integration

Test your code against a real database:

```java
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldSaveAndFindUser() {
        User user = new User("John", "john@example.com");

        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("john@example.com");
        assertTrue(found.isPresent());
        assertEquals("John", found.get().getName());
    }
}
```

### Service Layer Integration

Test services with their real dependencies:

```java
@SpringBootTest
class OrderServiceIntegrationTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void shouldCreateAndPersistOrder() {
        CreateOrderRequest request = new CreateOrderRequest("CUST-001", 99.99);

        Order order = orderService.createOrder(request);

        assertNotNull(order.getId());
        assertTrue(orderRepository.existsById(order.getId()));
    }
}
```

### External Service Integration

Test calls to external APIs:

```java
@SpringBootTest
class PaymentServiceIntegrationTest {

    @Autowired
    private PaymentService paymentService;

    @Test
    void shouldProcessPaymentWithGateway() {
        PaymentRequest request = new PaymentRequest(100.00, "4111111111111111");

        PaymentResult result = paymentService.processPayment(request);

        assertTrue(result.isSuccessful());
        assertNotNull(result.getTransactionId());
    }
}
```

## Testing with Embedded Databases

Use H2 for fast, in-memory database testing.

### Configuration

Add H2 to `pom.xml`:

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
```

Configure `application-test.properties`:

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
```

### Using @DataJpaTest

Spring's `@DataJpaTest` auto-configures an embedded database:

```java
@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldFindProductsByCategory() {
        // Arrange
        Product laptop = new Product("Laptop", "Electronics", 999.99);
        Product phone = new Product("Phone", "Electronics", 599.99);
        Product book = new Product("Java Guide", "Books", 49.99);

        entityManager.persist(laptop);
        entityManager.persist(phone);
        entityManager.persist(book);
        entityManager.flush();

        // Act
        List<Product> electronics = productRepository.findByCategory("Electronics");

        // Assert
        assertEquals(2, electronics.size());
    }
}
```

## Testing with Testcontainers

For production-like testing, use Testcontainers to run real databases in Docker.

### Setup

Add Testcontainers to `pom.xml`:

```xml
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>testcontainers</artifactId>
    <version>1.19.3</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <version>1.19.3</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>1.19.3</version>
    <scope>test</scope>
</dependency>
```

### Using Testcontainers

```java
@SpringBootTest
@Testcontainers
class UserServiceContainerTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserService userService;

    @Test
    void shouldPersistUserInRealDatabase() {
        User user = userService.createUser("John", "john@example.com");

        assertNotNull(user.getId());
        User found = userService.findById(user.getId());
        assertEquals("John", found.getName());
    }
}
```

## Testing REST Controllers

### Using @WebMvcTest

Test controllers in isolation with MockMvc:

```java
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldReturnUser() throws Exception {
        User user = new User(1L, "John", "john@example.com");
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John"))
            .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    void shouldReturn404WhenUserNotFound() throws Exception {
        when(userService.findById(999L)).thenReturn(null);

        mockMvc.perform(get("/api/users/999"))
            .andExpect(status().isNotFound());
    }
}
```

### Full Integration with @SpringBootTest

Test the complete request flow:

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserApiIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldCreateAndRetrieveUser() {
        // Create user
        CreateUserRequest request = new CreateUserRequest("Jane", "jane@example.com");
        ResponseEntity<User> createResponse = restTemplate.postForEntity(
            "/api/users", request, User.class);

        assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());
        Long userId = createResponse.getBody().getId();

        // Retrieve user
        ResponseEntity<User> getResponse = restTemplate.getForEntity(
            "/api/users/" + userId, User.class);

        assertEquals(HttpStatus.OK, getResponse.getStatusCode());
        assertEquals("Jane", getResponse.getBody().getName());
    }
}
```

## Managing Test Data

### Using @Sql

Load test data from SQL files:

```java
@SpringBootTest
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/cleanup.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class OrderServiceTest {

    @Autowired
    private OrderService orderService;

    @Test
    void shouldFindOrdersForCustomer() {
        // test-data.sql has pre-populated orders
        List<Order> orders = orderService.findByCustomerId("CUST-001");
        assertEquals(3, orders.size());
    }
}
```

`test-data.sql`:
```sql
INSERT INTO orders (id, customer_id, total) VALUES (1, 'CUST-001', 100.00);
INSERT INTO orders (id, customer_id, total) VALUES (2, 'CUST-001', 200.00);
INSERT INTO orders (id, customer_id, total) VALUES (3, 'CUST-001', 150.00);
```

### Using Test Fixtures

Create reusable test data builders:

```java
public class TestDataBuilder {

    public static User.Builder aUser() {
        return User.builder()
            .name("Test User")
            .email("test@example.com")
            .active(true);
    }

    public static Order.Builder anOrder() {
        return Order.builder()
            .customerId("CUST-001")
            .status(OrderStatus.PENDING)
            .total(99.99);
    }
}

// In tests
@Test
void shouldProcessActiveUser() {
    User user = TestDataBuilder.aUser()
        .name("John")
        .active(true)
        .build();

    // ... test logic
}
```

## Test Slices

Spring Boot provides test slices for focused testing:

| Annotation | Purpose | What's Loaded |
|------------|---------|---------------|
| `@DataJpaTest` | Repository testing | JPA components, embedded DB |
| `@WebMvcTest` | Controller testing | Web layer, MockMvc |
| `@JsonTest` | JSON serialization | Jackson components |
| `@RestClientTest` | REST client testing | RestTemplate, MockRestServiceServer |

```java
@JsonTest
class UserJsonTest {

    @Autowired
    private JacksonTester<User> json;

    @Test
    void shouldSerializeUser() throws Exception {
        User user = new User(1L, "John", "john@example.com");

        assertThat(json.write(user))
            .hasJsonPathStringValue("$.name")
            .extractingJsonPathStringValue("$.name")
            .isEqualTo("John");
    }
}
```

## Best Practices

### Isolate Test Data

Each test should create its own data:

```java
@Test
@Transactional  // Rolls back after each test
void shouldUpdateUser() {
    User user = userRepository.save(new User("John", "john@example.com"));

    user.setName("Jane");
    userRepository.save(user);

    User updated = userRepository.findById(user.getId()).orElseThrow();
    assertEquals("Jane", updated.getName());
}
```

### Use Meaningful Test Names

```java
@Test
void shouldReturnEmptyList_whenNoOrdersExistForCustomer() { }

@Test
void shouldThrowException_whenDuplicateEmailProvided() { }
```

### Test Both Happy Path and Edge Cases

```java
@Test
void shouldCreateOrder_withValidData() { }

@Test
void shouldRejectOrder_whenInventoryInsufficient() { }

@Test
void shouldRetry_whenPaymentGatewayTimesOut() { }
```

## Practice Exercise

Write integration tests for an e-commerce order system:

1. Test saving an order to the database and retrieving it
2. Test finding all orders for a specific customer
3. Test that order total is calculated correctly (sum of line items)
4. Test the REST endpoint `POST /api/orders` creates an order
5. Test the REST endpoint `GET /api/orders/{id}` returns 404 for non-existent orders

**Bonus**: Use Testcontainers with PostgreSQL instead of H2.

## Key Takeaways

- Integration tests verify components work together correctly
- Use embedded databases (H2) for fast testing
- Use Testcontainers for production-like database testing
- Spring test slices load only necessary components
- Manage test data carefully to keep tests independent
- Balance speed with realism when choosing test strategies

## Next Steps

Learn how to test entire services as black boxes with Component Testing.
