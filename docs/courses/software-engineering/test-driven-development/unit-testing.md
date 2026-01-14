---
sidebar_position: 2
---

# Unit Testing

Learn how to write effective unit tests that verify individual components work correctly in isolation.

## What is Unit Testing?

A unit test verifies that a single "unit" of code (typically a method or class) works correctly in isolation. Unit tests are:

- **Fast**: Run in milliseconds
- **Isolated**: No external dependencies (database, network, filesystem)
- **Focused**: Test one behaviour at a time
- **Deterministic**: Same input always produces same output

## Anatomy of a Unit Test

Every unit test follows the **Arrange-Act-Assert** pattern:

```java
@Test
void shouldCalculateOrderTotal() {
    // Arrange - Set up test data and dependencies
    Order order = new Order();
    order.addItem(new Item("Widget", 10.00));
    order.addItem(new Item("Gadget", 25.00));

    // Act - Execute the code under test
    double total = order.calculateTotal();

    // Assert - Verify the result
    assertEquals(35.00, total, 0.01);
}
```

## Writing Your First Unit Test

### 1. Create a Test Class

Test classes mirror your source classes:

```
src/
├── main/java/com/example/
│   └── Calculator.java
└── test/java/com/example/
    └── CalculatorTest.java
```

### 2. Write the Test

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    @Test
    void shouldAddTwoNumbers() {
        Calculator calculator = new Calculator();

        int result = calculator.add(2, 3);

        assertEquals(5, result);
    }

    @Test
    void shouldSubtractTwoNumbers() {
        Calculator calculator = new Calculator();

        int result = calculator.subtract(10, 4);

        assertEquals(6, result);
    }
}
```

### 3. Write the Implementation

```java
public class Calculator {

    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }
}
```

## JUnit Assertions

JUnit provides many assertion methods:

| Assertion | Purpose | Example |
|-----------|---------|---------|
| `assertEquals(expected, actual)` | Values are equal | `assertEquals(5, result)` |
| `assertNotEquals(unexpected, actual)` | Values differ | `assertNotEquals(0, count)` |
| `assertTrue(condition)` | Condition is true | `assertTrue(user.isActive())` |
| `assertFalse(condition)` | Condition is false | `assertFalse(list.isEmpty())` |
| `assertNull(object)` | Object is null | `assertNull(error)` |
| `assertNotNull(object)` | Object is not null | `assertNotNull(response)` |
| `assertThrows(exception, executable)` | Exception is thrown | See below |
| `assertAll(executables...)` | All assertions pass | Group related assertions |

### Testing Exceptions

```java
@Test
void shouldThrowExceptionForInvalidInput() {
    Calculator calculator = new Calculator();

    assertThrows(IllegalArgumentException.class, () -> {
        calculator.divide(10, 0);
    });
}
```

### Grouping Assertions

```java
@Test
void shouldCreateValidUser() {
    User user = new User("John", "john@example.com");

    assertAll("user properties",
        () -> assertEquals("John", user.getName()),
        () -> assertEquals("john@example.com", user.getEmail()),
        () -> assertNotNull(user.getId())
    );
}
```

## Test Lifecycle

JUnit provides hooks to run code before and after tests:

```java
class UserServiceTest {

    private UserService userService;

    @BeforeEach
    void setUp() {
        // Runs before each test method
        userService = new UserService();
    }

    @AfterEach
    void tearDown() {
        // Runs after each test method
        userService.cleanup();
    }

    @BeforeAll
    static void setUpOnce() {
        // Runs once before all tests in this class
    }

    @AfterAll
    static void tearDownOnce() {
        // Runs once after all tests in this class
    }

    @Test
    void shouldCreateUser() {
        // userService is freshly created for each test
    }
}
```

## Mocking Dependencies

Real-world classes have dependencies. Use mocking to isolate the unit under test.

### Setting Up Mockito

Add to `pom.xml`:

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.8.0</version>
    <scope>test</scope>
</dependency>
```

### Creating Mocks

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private PaymentGateway paymentGateway;

    @Mock
    private EmailService emailService;

    @Test
    void shouldProcessOrder() {
        // Arrange - Define mock behaviour
        when(paymentGateway.charge(anyDouble())).thenReturn(true);

        OrderService orderService = new OrderService(paymentGateway, emailService);
        Order order = new Order(100.00);

        // Act
        boolean result = orderService.processOrder(order);

        // Assert
        assertTrue(result);
        verify(paymentGateway).charge(100.00);
        verify(emailService).sendConfirmation(order);
    }
}
```

### Common Mockito Methods

| Method | Purpose |
|--------|---------|
| `when(mock.method()).thenReturn(value)` | Define return value |
| `when(mock.method()).thenThrow(exception)` | Throw exception |
| `verify(mock).method()` | Verify method was called |
| `verify(mock, times(2)).method()` | Verify call count |
| `verify(mock, never()).method()` | Verify never called |
| `any()`, `anyString()`, `anyInt()` | Match any argument |

## Testing Edge Cases

Good unit tests cover edge cases:

```java
class StringUtilsTest {

    @Test
    void shouldReverseString() {
        assertEquals("cba", StringUtils.reverse("abc"));
    }

    @Test
    void shouldHandleEmptyString() {
        assertEquals("", StringUtils.reverse(""));
    }

    @Test
    void shouldHandleNull() {
        assertNull(StringUtils.reverse(null));
    }

    @Test
    void shouldHandleSingleCharacter() {
        assertEquals("a", StringUtils.reverse("a"));
    }

    @Test
    void shouldHandlePalindrome() {
        assertEquals("radar", StringUtils.reverse("radar"));
    }
}
```

## Parameterized Tests

Run the same test with different inputs:

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

class CalculatorTest {

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void shouldSquarePositiveNumbers(int number) {
        Calculator calculator = new Calculator();
        assertTrue(calculator.square(number) > 0);
    }

    @ParameterizedTest
    @CsvSource({
        "1, 1, 2",
        "2, 3, 5",
        "10, 20, 30",
        "-1, 1, 0"
    })
    void shouldAddNumbers(int a, int b, int expected) {
        Calculator calculator = new Calculator();
        assertEquals(expected, calculator.add(a, b));
    }
}
```

## Best Practices

### Name Tests Clearly

```java
// Bad - unclear what's being tested
@Test
void test1() { }

// Good - describes behaviour
@Test
void shouldReturnEmptyListWhenNoUsersExist() { }

// Also good - given/when/then style
@Test
void givenNoUsers_whenFindAll_thenReturnEmptyList() { }
```

### One Assertion Per Concept

```java
// Avoid - testing multiple behaviours
@Test
void testUserCreation() {
    User user = userService.create("John");
    assertNotNull(user);
    assertEquals("John", user.getName());
    assertTrue(user.isActive());
    verify(emailService).sendWelcome(user);
}

// Better - separate tests for each behaviour
@Test
void shouldCreateUserWithName() { }

@Test
void shouldSetNewUserAsActive() { }

@Test
void shouldSendWelcomeEmailOnCreation() { }
```

### Keep Tests Independent

Each test should set up its own data and not depend on other tests:

```java
// Bad - tests depend on shared state
private static User testUser;

@Test
void shouldCreateUser() {
    testUser = userService.create("John");  // Other tests depend on this
}

@Test
void shouldUpdateUser() {
    testUser.setName("Jane");  // Fails if previous test didn't run
}

// Good - each test is independent
@Test
void shouldCreateUser() {
    User user = userService.create("John");
    assertNotNull(user);
}

@Test
void shouldUpdateUser() {
    User user = userService.create("John");
    user.setName("Jane");
    assertEquals("Jane", user.getName());
}
```

## Practice Exercise

Write unit tests for a `ShoppingCart` class:

1. Test adding an item to the cart
2. Test removing an item from the cart
3. Test calculating the total price
4. Test applying a discount percentage
5. Test that cart is empty after clearing
6. Test that adding null item throws an exception

**Bonus**: Use parameterized tests to verify the discount calculation with different percentages (10%, 20%, 50%).

## Key Takeaways

- Unit tests verify individual units in isolation
- Follow the Arrange-Act-Assert pattern
- Use mocks to isolate dependencies
- Test edge cases and error conditions
- Write clear, descriptive test names
- Keep tests independent and focused

## Next Steps

Learn how to test multiple components working together with Integration Testing.
