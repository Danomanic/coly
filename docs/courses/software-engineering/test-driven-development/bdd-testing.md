---
sidebar_position: 5
---

# BDD Testing

Learn how to write tests in business language using Behaviour Driven Development with Cucumber.

## What is BDD?

Behaviour Driven Development (BDD) bridges the gap between technical and non-technical stakeholders. Tests are written in plain English using a format that everyone can understand.

```gherkin
Feature: Shopping Cart

  Scenario: Adding items to cart
    Given I have an empty shopping cart
    When I add a "Laptop" priced at 999.99
    Then my cart should contain 1 item
    And my cart total should be 999.99
```

### BDD vs TDD

| Aspect | TDD | BDD |
|--------|-----|-----|
| Language | Technical (code) | Business (Gherkin) |
| Audience | Developers | Everyone |
| Focus | Implementation | Behaviour |
| Granularity | Unit/function | Feature/scenario |

## The Gherkin Language

Gherkin is a structured language for describing behaviour:

### Keywords

| Keyword | Purpose | Example |
|---------|---------|---------|
| `Feature` | Describes the feature being tested | `Feature: User Registration` |
| `Scenario` | A specific test case | `Scenario: Successful registration` |
| `Given` | Initial context/state | `Given I am on the login page` |
| `When` | Action being performed | `When I enter valid credentials` |
| `Then` | Expected outcome | `Then I should see my dashboard` |
| `And` / `But` | Additional steps | `And I should receive a welcome email` |

### Example Feature File

```gherkin
Feature: User Authentication
  As a registered user
  I want to log into my account
  So that I can access my personal dashboard

  Background:
    Given the following users exist:
      | email              | password   |
      | john@example.com   | secret123  |
      | jane@example.com   | password1  |

  Scenario: Successful login
    Given I am on the login page
    When I enter email "john@example.com"
    And I enter password "secret123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see "Welcome, John"

  Scenario: Failed login with wrong password
    Given I am on the login page
    When I enter email "john@example.com"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page
```

## Setting Up Cucumber

### Dependencies

Add to `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>cucumber-java</artifactId>
        <version>7.15.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>cucumber-junit-platform-engine</artifactId>
        <version>7.15.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>cucumber-spring</artifactId>
        <version>7.15.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### Project Structure

```
src/
├── main/java/
│   └── com/example/
└── test/
    ├── java/
    │   └── com/example/
    │       ├── CucumberTest.java        # Test runner
    │       └── steps/
    │           └── UserSteps.java       # Step definitions
    └── resources/
        └── features/
            └── user.feature             # Feature files
```

### Test Runner

```java
package com.example;

import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;

import static io.cucumber.junit.platform.engine.Constants.GLUE_PROPERTY_NAME;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "com.example.steps")
public class CucumberTest {
}
```

## Writing Step Definitions

Step definitions connect Gherkin to Java code:

```java
package com.example.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import static org.junit.jupiter.api.Assertions.*;

public class UserSteps {

    private LoginPage loginPage;
    private String currentPage;
    private String displayedMessage;

    @Given("I am on the login page")
    public void iAmOnTheLoginPage() {
        loginPage = new LoginPage();
        currentPage = "login";
    }

    @When("I enter email {string}")
    public void iEnterEmail(String email) {
        loginPage.enterEmail(email);
    }

    @When("I enter password {string}")
    public void iEnterPassword(String password) {
        loginPage.enterPassword(password);
    }

    @When("I click the login button")
    public void iClickTheLoginButton() {
        LoginResult result = loginPage.submit();
        currentPage = result.getRedirectPage();
        displayedMessage = result.getMessage();
    }

    @Then("I should be redirected to the dashboard")
    public void iShouldBeRedirectedToDashboard() {
        assertEquals("dashboard", currentPage);
    }

    @Then("I should see {string}")
    public void iShouldSee(String expectedMessage) {
        assertTrue(displayedMessage.contains(expectedMessage));
    }

    @Then("I should see an error message {string}")
    public void iShouldSeeAnErrorMessage(String errorMessage) {
        assertEquals(errorMessage, displayedMessage);
    }

    @Then("I should remain on the login page")
    public void iShouldRemainOnLoginPage() {
        assertEquals("login", currentPage);
    }
}
```

## Data Tables

Pass structured data to steps:

```gherkin
Scenario: Bulk user creation
  Given the following users are registered:
    | name  | email              | role    |
    | John  | john@example.com   | admin   |
    | Jane  | jane@example.com   | user    |
    | Bob   | bob@example.com    | user    |
  When I request the user list
  Then I should see 3 users
```

Step definition:

```java
@Given("the following users are registered:")
public void theFollowingUsersAreRegistered(DataTable dataTable) {
    List<Map<String, String>> users = dataTable.asMaps();

    for (Map<String, String> userData : users) {
        User user = new User(
            userData.get("name"),
            userData.get("email"),
            userData.get("role")
        );
        userService.create(user);
    }
}
```

## Scenario Outlines

Run the same scenario with different data:

```gherkin
Scenario Outline: Order discount calculation
  Given I have an order with total <total>
  When the discount is calculated
  Then the discount should be <discount>
  And the final price should be <final_price>

  Examples:
    | total  | discount | final_price |
    | 50.00  | 0.00     | 50.00       |
    | 100.00 | 5.00     | 95.00       |
    | 200.00 | 20.00    | 180.00      |
    | 500.00 | 75.00    | 425.00      |
```

Step definitions:

```java
private Order order;
private double calculatedDiscount;

@Given("I have an order with total {double}")
public void iHaveAnOrderWithTotal(double total) {
    order = new Order(total);
}

@When("the discount is calculated")
public void theDiscountIsCalculated() {
    calculatedDiscount = discountService.calculate(order);
}

@Then("the discount should be {double}")
public void theDiscountShouldBe(double expectedDiscount) {
    assertEquals(expectedDiscount, calculatedDiscount, 0.01);
}

@Then("the final price should be {double}")
public void theFinalPriceShouldBe(double expectedPrice) {
    assertEquals(expectedPrice, order.getTotal() - calculatedDiscount, 0.01);
}
```

## Hooks

Run code before and after scenarios:

```java
package com.example.steps;

import io.cucumber.java.Before;
import io.cucumber.java.After;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.AfterAll;

public class Hooks {

    @BeforeAll
    public static void beforeAll() {
        // Run once before all scenarios
        System.out.println("Starting test suite");
    }

    @Before
    public void before() {
        // Run before each scenario
        testContext.reset();
    }

    @Before("@database")
    public void setupDatabase() {
        // Run only for scenarios tagged with @database
        database.clean();
    }

    @After
    public void after() {
        // Run after each scenario
        testContext.cleanup();
    }

    @AfterAll
    public static void afterAll() {
        // Run once after all scenarios
        System.out.println("Test suite complete");
    }
}
```

## Tags

Organise and filter scenarios:

```gherkin
@authentication
Feature: User Login

  @smoke @critical
  Scenario: Successful login
    Given I am on the login page
    ...

  @negative
  Scenario: Failed login
    Given I am on the login page
    ...

  @slow @integration
  Scenario: Login with two-factor authentication
    Given I have 2FA enabled
    ...
```

Run specific tags:

```bash
# Run only smoke tests
mvn test -Dcucumber.filter.tags="@smoke"

# Run smoke OR critical tests
mvn test -Dcucumber.filter.tags="@smoke or @critical"

# Run authentication tests except slow ones
mvn test -Dcucumber.filter.tags="@authentication and not @slow"
```

## Spring Integration

Integrate Cucumber with Spring Boot:

```java
package com.example.steps;

import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CucumberSpringConfig {
}
```

Now inject Spring beans into step definitions:

```java
@Component
public class OrderSteps {

    @Autowired
    private OrderService orderService;

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    @When("I submit an order for {string}")
    public void iSubmitAnOrderFor(String product) {
        CreateOrderRequest request = new CreateOrderRequest(product);
        restTemplate.postForEntity(
            "http://localhost:" + port + "/api/orders",
            request,
            Order.class
        );
    }
}
```

## Sharing State Between Steps

Use a shared context class:

```java
@Component
public class TestContext {
    private User currentUser;
    private Order currentOrder;
    private Response lastResponse;

    public User getCurrentUser() { return currentUser; }
    public void setCurrentUser(User user) { this.currentUser = user; }

    public Order getCurrentOrder() { return currentOrder; }
    public void setCurrentOrder(Order order) { this.currentOrder = order; }

    public Response getLastResponse() { return lastResponse; }
    public void setLastResponse(Response response) { this.lastResponse = response; }

    public void reset() {
        currentUser = null;
        currentOrder = null;
        lastResponse = null;
    }
}
```

Usage in steps:

```java
@Component
public class UserSteps {

    @Autowired
    private TestContext context;

    @Given("I am logged in as {string}")
    public void iAmLoggedInAs(String email) {
        User user = userService.findByEmail(email);
        context.setCurrentUser(user);
    }
}

@Component
public class OrderSteps {

    @Autowired
    private TestContext context;

    @When("I place an order")
    public void iPlaceAnOrder() {
        User user = context.getCurrentUser();
        Order order = orderService.create(user.getId());
        context.setCurrentOrder(order);
    }
}
```

## Best Practices

### Write Declarative Scenarios

Focus on **what**, not **how**:

```gherkin
# Bad - too implementation-focused
Scenario: User registration
  Given I navigate to "/register"
  When I find element with id "email" and type "john@example.com"
  And I find element with id "password" and type "secret123"
  And I click button with class "submit-btn"
  Then I should see element with class "success-message"

# Good - behaviour-focused
Scenario: User registration
  Given I am on the registration page
  When I register with email "john@example.com" and password "secret123"
  Then I should see a success message
  And I should receive a confirmation email
```

### Reuse Step Definitions

Write generic, reusable steps:

```java
@Then("I should see {string}")
public void iShouldSee(String text) {
    assertTrue(page.contains(text));
}

@Then("the response status should be {int}")
public void responseStatusShouldBe(int status) {
    assertEquals(status, context.getLastResponse().getStatusCode());
}
```

### Keep Scenarios Independent

Each scenario should work on its own:

```gherkin
# Bad - depends on previous scenario
Scenario: View user profile
  Then I should see my profile  # Assumes login from previous scenario

# Good - self-contained
Scenario: View user profile
  Given I am logged in as "john@example.com"
  When I navigate to my profile
  Then I should see my profile details
```

## Example: E-Commerce Feature

Complete example with multiple scenarios:

```gherkin
Feature: Shopping Cart
  As a customer
  I want to manage items in my shopping cart
  So that I can purchase products

  Background:
    Given the following products exist:
      | name    | price  | stock |
      | Laptop  | 999.99 | 10    |
      | Mouse   | 29.99  | 50    |
      | Keyboard| 79.99  | 25    |

  @smoke
  Scenario: Add item to empty cart
    Given I have an empty cart
    When I add "Laptop" to my cart
    Then my cart should contain 1 item
    And my cart total should be 999.99

  Scenario: Add multiple items
    Given I have an empty cart
    When I add "Laptop" to my cart
    And I add "Mouse" to my cart
    Then my cart should contain 2 items
    And my cart total should be 1029.98

  Scenario: Remove item from cart
    Given I have a cart with "Laptop" and "Mouse"
    When I remove "Laptop" from my cart
    Then my cart should contain 1 item
    And my cart total should be 29.99

  Scenario: Apply discount code
    Given I have a cart with total 100.00
    When I apply discount code "SAVE10"
    Then my cart total should be 90.00

  Scenario Outline: Shipping calculation
    Given I have a cart with total <cart_total>
    When I calculate shipping to <country>
    Then the shipping cost should be <shipping>

    Examples:
      | cart_total | country | shipping |
      | 50.00      | UK      | 5.99     |
      | 100.00     | UK      | 0.00     |
      | 50.00      | US      | 15.99    |
      | 200.00     | US      | 9.99     |
```

## Practice Exercise

Write BDD tests for a library book borrowing system:

1. Create a feature file for "Book Borrowing"
2. Write scenarios for:
   - Borrowing an available book
   - Returning a borrowed book
   - Attempting to borrow an unavailable book
   - Viewing borrowing history
   - Late return fee calculation (use Scenario Outline)
3. Implement step definitions that work with a mock library service
4. Add tags for `@smoke`, `@happy-path`, and `@negative` scenarios

## Key Takeaways

- BDD tests are written in business language using Gherkin
- Feature files describe behaviour through Given/When/Then steps
- Step definitions connect Gherkin to Java code
- Data tables and scenario outlines enable data-driven testing
- Tags help organise and filter test execution
- Keep scenarios declarative, independent, and focused on behaviour

## Summary

You've now learned the full spectrum of testing approaches:

1. **Unit Tests** - Fast, isolated tests for individual components
2. **Integration Tests** - Verify components work together
3. **Component Tests** - Black-box testing of entire services
4. **BDD Tests** - Business-readable acceptance tests

A balanced test suite uses all these approaches, following the testing pyramid to build confidence in your software.
