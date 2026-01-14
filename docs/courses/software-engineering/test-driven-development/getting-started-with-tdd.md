---
sidebar_position: 1
---

# Getting started with TDD

Learn the practice of writing tests before writing code - a fundamental skill for professional software engineers.

## What is TDD?

Test Driven Development is a software development approach where you:

1. **Write a test** for the functionality you want to add
2. **Run the test** and watch it fail (since the code doesn't exist yet)
3. **Write the minimum code** needed to make the test pass
4. **Refactor** your code while keeping tests green
5. **Repeat** for the next feature

This is often called the **Red-Green-Refactor** cycle.

## Why Use TDD?

- **Better Design**: Forces you to think about how your code will be used before you write it
- **Confidence**: Comprehensive tests give you confidence to refactor and make changes
- **Documentation**: Tests serve as living documentation of how your code works
- **Fewer Bugs**: Catch issues early in development before they reach production
- **Faster Development**: Less time debugging, more time building features
- **Better Code Coverage**: Writing tests first ensures all code paths are tested

## The Red-Green-Refactor Cycle in Detail

### Red Phase
Write a failing test that describes the behaviour you want. The test should fail because the functionality doesn't exist yet. This confirms your test can actually catch problems.

### Green Phase
Write the **minimum** code needed to make the test pass. Don't worry about perfection - just get it working. Resist the urge to write extra features.

### Refactor Phase
Now that you have a passing test, improve your code's design:
- Remove duplication
- Improve naming
- Simplify logic
- Extract methods or classes

The tests protect you during refactoring - if they still pass, your changes didn't break anything!

## When to Use TDD

TDD works especially well for:
- **Business Logic**: Calculations, validations, algorithms
- **Utility Functions**: String manipulation, data transformations
- **API Endpoints**: Testing request/response behaviour
- **Bug Fixes**: Write a failing test that reproduces the bug, then fix it

TDD may be less beneficial for:
- **UI/Visual Design**: Where quick iteration and visual feedback matter more
- **Proof of Concepts**: When exploring ideas and requirements are unclear
- **Simple CRUD Operations**: Where the logic is straightforward

## Common Misconceptions

**"TDD means 100% test coverage"**
- Not all code needs the same level of testing. Focus on critical business logic.

**"TDD is slower"**
- Initially, yes. But over time, you spend less time debugging and fixing bugs.

**"You must never write code without a test first"**
- TDD is a guideline, not a rule. Use judgment about when it adds value.

## Types of Tests

Not all tests are created equal. Different types of tests serve different purposes and run at different speeds. Understanding these types helps you build a balanced test suite.

### The Testing Pyramid

The testing pyramid is a visual guide for how many tests of each type you should have:

```
            /\
           /  \
          / E2E\         ← Few: Slow, expensive, test full user journeys
         /------\
        /        \
       /Component \      ← Some: Test service boundaries and integrations
      /------------\
     /              \
    / Integration    \   ← More: Test multiple units working together
   /------------------\
  /                    \
 /    Unit Tests        \ ← Many: Fast, cheap, test individual functions
/________________________\
```

**Key principle**: Have more tests at the bottom (fast, focused) and fewer at the top (slow, broad).

### Overview of Test Types

| Type | Scope | Speed | Purpose |
|------|-------|-------|---------|
| **Unit** | Single function or class | Very fast (ms) | Verify individual units work correctly |
| **Integration** | Multiple units together | Fast (ms-s) | Verify units work together |
| **Component** | Entire service/module | Medium (s) | Verify service behaviour at boundaries |
| **E2E / BDD** | Full system | Slow (s-min) | Verify user journeys and business scenarios |

### Unit Tests

Test individual functions, methods, or classes in isolation. Dependencies are mocked or stubbed.

```java
@Test
void shouldCalculateTotalWithDiscount() {
    PriceCalculator calculator = new PriceCalculator();
    double total = calculator.calculateTotal(100.0, 0.1);
    assertEquals(90.0, total);
}
```

**Characteristics:**
- Test one thing at a time
- No external dependencies (database, network, filesystem)
- Run in milliseconds
- Form the foundation of your test suite

### Integration Tests

Test how multiple units work together. May include real databases or external services.

```java
@Test
void shouldSaveAndRetrieveUser() {
    User user = new User("John", "john@example.com");
    userRepository.save(user);

    User retrieved = userRepository.findByEmail("john@example.com");
    assertEquals("John", retrieved.getName());
}
```

**Characteristics:**
- Test interactions between components
- May use real or embedded databases
- Slower than unit tests
- Catch integration issues early

### Component Tests

Test an entire service or module through its public API, treating it as a black box.

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserServiceComponentTest {

    @Test
    void shouldCreateUserViaApi() {
        ResponseEntity<User> response = restTemplate.postForEntity(
            "/api/users",
            new CreateUserRequest("Jane", "jane@example.com"),
            User.class
        );

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }
}
```

**Characteristics:**
- Test service boundaries
- Use real HTTP requests
- May use test containers for dependencies
- Verify the service works as a whole

### BDD / E2E Tests

Test complete user scenarios using business language. Written in a format that stakeholders can understand.

```gherkin
Feature: User Registration

  Scenario: Successful registration
    Given I am on the registration page
    When I enter valid user details
    And I click the register button
    Then I should see a welcome message
    And I should receive a confirmation email
```

**Characteristics:**
- Written in business language (Gherkin)
- Test complete user journeys
- Slowest to run
- Best for critical business workflows

## Balancing Your Test Suite

A healthy test suite follows the pyramid proportions:

| Type | Percentage | Example (1000 tests) |
|------|------------|---------------------|
| Unit | 70% | 700 tests |
| Integration | 20% | 200 tests |
| Component/E2E | 10% | 100 tests |

**Anti-pattern - The Ice Cream Cone**: Having mostly E2E tests and few unit tests leads to slow, fragile test suites.

## Next Steps

Ready to dive deeper? Explore each test type in detail:
- Learn to write effective **Unit Tests** with mocking and assertions
- Master **Integration Testing** with real databases
- Build **Component Tests** for service boundaries
- Write **BDD Tests** with Cucumber for business scenarios

Or jump straight into implementing TDD in Java with JUnit.
