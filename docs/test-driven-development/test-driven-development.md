---
sidebar_position: 1
---

# Test Driven Development (TDD)

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

- **Better Design**: Forces you to think about how your code will be used
- **Confidence**: Tests give you confidence to refactor and make changes
- **Documentation**: Tests serve as living documentation of how your code works
- **Fewer Bugs**: Catch issues early before they reach production
- **Faster Development**: Less time debugging, more time building

## TDD in Java

In Java, we typically use **JUnit** for writing tests. JUnit is the most popular testing framework for Java.

### Setting Up JUnit

If you're using Maven, add this to your `pom.xml`:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
```

## Example: Building a Calculator with TDD

Let's build a simple calculator using TDD.

### Step 1: Write the Test First

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

The test will fail because `Calculator` doesn't exist yet. This is expected!

### Step 3: Write Minimum Code to Pass

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```

### Step 4: Run the Test Again (It Passes!)

Now your test should pass. You've successfully implemented addition!

### Step 5: Add More Tests

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
```

## Best Practices

1. **Test One Thing**: Each test should verify one specific behavior
2. **Clear Names**: Test names should describe what they're testing
3. **Arrange-Act-Assert**: Structure your tests clearly
   - Arrange: Set up test data
   - Act: Execute the code being tested
   - Assert: Verify the result
4. **Keep Tests Fast**: Tests should run quickly so you run them often
5. **Independent Tests**: Tests shouldn't depend on each other

## Practice Exercise

Build a `StringUtils` class using TDD that can:
1. Reverse a string
2. Check if a string is a palindrome
3. Count vowels in a string

Write tests first, then implement!

## Next Steps

Now that you understand TDD, let's learn about REST APIs and how to test them.
