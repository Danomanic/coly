---
sidebar_position: 2
---

# TDD in Java

Learn how to practice Test Driven Development using JUnit, Java's most popular testing framework.

## Setting Up JUnit

In Java, we use **JUnit** for writing tests. JUnit 5 (also known as JUnit Jupiter) is the current standard.

Add this dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
```

:::tip
If you haven't learned about Maven yet, check out the Maven Basics lesson in the Fundamentals section first.
:::

## JUnit Basics

### Common Annotations

- `@Test`: Marks a method as a test case
- `@BeforeEach`: Runs before each test method
- `@AfterEach`: Runs after each test method
- `@BeforeAll`: Runs once before all tests in the class
- `@AfterAll`: Runs once after all tests in the class

### Common Assertions

```java
import static org.junit.jupiter.api.Assertions.*;

assertEquals(expected, actual);        // Check if values are equal
assertTrue(condition);                 // Check if condition is true
assertFalse(condition);               // Check if condition is false
assertNull(object);                   // Check if object is null
assertNotNull(object);                // Check if object is not null
assertThrows(Exception.class, () -> {}); // Check if exception is thrown
```

## Example: Building a Calculator with TDD

Let's build a simple calculator using the TDD approach.

### Step 1: Write the Test First

Create a test class in your `src/test/java` directory:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {
    @Test
    public void testAddition() {
        Calculator calc = new Calculator();
        int result = calc.add(2, 3);
        assertEquals(5, result);
    }
}
```

### Step 2: Run the Test (It Fails)

The test will fail because `Calculator` doesn't exist yet. This is expected in TDD - **Red** phase!

```
Error: Cannot find symbol 'Calculator'
```

### Step 3: Write Minimum Code to Pass

Create the `Calculator` class in your `src/main/java` directory:

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```

### Step 4: Run the Test Again (It Passes!)

Now your test should pass - **Green** phase! You've successfully implemented addition.

### Step 5: Refactor (If Needed)

In this case, our code is already simple and clean. The **Refactor** phase would be where we improve code quality while keeping tests green.

### Step 6: Add More Tests

Continue the cycle for other operations:

```java
@Test
public void testSubtraction() {
    Calculator calc = new Calculator();
    int result = calc.subtract(5, 3);
    assertEquals(2, result);
}

@Test
public void testMultiplication() {
    Calculator calc = new Calculator();
    int result = calc.multiply(4, 3);
    assertEquals(12, result);
}

@Test
public void testDivision() {
    Calculator calc = new Calculator();
    int result = calc.divide(12, 3);
    assertEquals(4, result);
}

@Test
public void testDivisionByZero() {
    Calculator calc = new Calculator();
    assertThrows(ArithmeticException.class, () -> {
        calc.divide(10, 0);
    });
}
```

### Complete Calculator Implementation

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public int multiply(int a, int b) {
        return a * b;
    }

    public int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        return a / b;
    }
}
```

## Test Structure: Arrange-Act-Assert

A well-written test follows the AAA pattern:

```java
@Test
public void testCalculateDiscount() {
    // Arrange: Set up test data
    PriceCalculator calculator = new PriceCalculator();
    double price = 100.0;
    double discountPercent = 20.0;

    // Act: Execute the code being tested
    double result = calculator.applyDiscount(price, discountPercent);

    // Assert: Verify the result
    assertEquals(80.0, result, 0.01);
}
```

## Best Practices

1. **Test One Thing**: Each test should verify one specific behaviour
   ```java
   // Good: Tests one specific case
   @Test
   public void testAddPositiveNumbers() { }

   // Bad: Tests multiple unrelated things
   @Test
   public void testAllMathOperations() { }
   ```

2. **Clear Test Names**: Use descriptive names that explain what's being tested
   ```java
   // Good
   @Test
   public void shouldReturnZeroWhenAddingNegativeAndPositiveOfSameValue() { }

   // Bad
   @Test
   public void test1() { }
   ```

3. **Keep Tests Fast**: Tests should run quickly so you run them often

4. **Independent Tests**: Tests shouldn't depend on each other or shared state

5. **Test Edge Cases**: Don't just test the happy path
   ```java
   @Test
   public void testDivisionByZero() { }

   @Test
   public void testNegativeNumbers() { }

   @Test
   public void testLargeNumbers() { }
   ```

## Running Tests

### From IDE
Most IDEs (IntelliJ, Eclipse, VS Code) have built-in test runners. Look for the green play button next to test methods.

### From Maven
```bash
# Run all tests
mvn test

# Run tests in a specific class
mvn test -Dtest=CalculatorTest

# Run a specific test method
mvn test -Dtest=CalculatorTest#testAddition
```

### From Command Line (Without Maven)
If you're not using Maven, you can run tests directly:
```bash
# Compile test classes
javac -cp .:junit-platform-console-standalone.jar CalculatorTest.java

# Run tests
java -jar junit-platform-console-standalone.jar --class-path . --scan-class-path
```

## Practice Exercise

Build a `StringUtils` class using TDD that can:
1. **Reverse a string**: `reverse("hello")` returns `"olleh"`
2. **Check if palindrome**: `isPalindrome("racecar")` returns `true`
3. **Count vowels**: `countVowels("hello")` returns `2`

**Remember**: Write the tests first, then implement!

### Getting Started

Start with this test:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class StringUtilsTest {
    @Test
    public void testReverse() {
        StringUtils utils = new StringUtils();
        String result = utils.reverse("hello");
        assertEquals("olleh", result);
    }

    // Add more tests...
}
```

## Next Steps

Now that you understand TDD in Java, apply these practices when building REST APIs and other applications. Tests will give you confidence to refactor and add new features without breaking existing functionality.
