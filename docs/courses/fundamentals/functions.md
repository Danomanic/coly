---
sidebar_position: 9
---

# Functions (Methods)

Learn how to organise your code into reusable blocks using functions (called methods in Java).

## What are Functions?

A **function** (or **method** in Java) is a reusable block of code that performs a specific task. Instead of writing the same code repeatedly, you can define it once and call it whenever needed.

Think of functions like recipes: you write the recipe once, but you can cook it many times.

```java
// Define the function once
public static void greet() {
    System.out.println("Hello, World!");
}

// Use it multiple times
greet();  // Prints: Hello, World!
greet();  // Prints: Hello, World!
greet();  // Prints: Hello, World!
```

## Why Use Functions?

- **Reusability**: Write code once, use it many times
- **Organisation**: Break large programs into smaller, manageable pieces
- **Maintainability**: Fix bugs in one place, not everywhere
- **Readability**: Make code easier to understand
- **Testing**: Test individual pieces of functionality

## Defining a Method

### Syntax

```java
public static returnType methodName(parameters) {
    // Method body
    return value;  // If returnType is not void
}
```

### Example

```java
public static void sayHello() {
    System.out.println("Hello!");
}
```

Let's break this down:
- `public`: Can be accessed from anywhere
- `static`: Belongs to the class, not an instance (more on this later)
- `void`: Returns nothing
- `sayHello`: Method name (use camelCase)
- `()`: No parameters
- `{}`: Method body

## Calling a Method

To execute a method, use its name followed by parentheses:

```java
public class Main {
    public static void main(String[] args) {
        sayHello();  // Call the method
    }

    public static void sayHello() {
        System.out.println("Hello!");
    }
}
```

## Parameters

Parameters allow you to pass information to a method:

```java
public static void greet(String name) {
    System.out.println("Hello, " + name + "!");
}

// Usage
greet("Alice");  // Hello, Alice!
greet("Bob");    // Hello, Bob!
```

### Multiple Parameters

```java
public static void introduce(String name, int age) {
    System.out.println("My name is " + name + " and I'm " + age);
}

// Usage
introduce("Alice", 25);  // My name is Alice and I'm 25
introduce("Bob", 30);    // My name is Bob and I'm 30
```

### Different Parameter Types

```java
public static void printDetails(String name, int age, double height, boolean isStudent) {
    System.out.println("Name: " + name);
    System.out.println("Age: " + age);
    System.out.println("Height: " + height + "m");
    System.out.println("Student: " + isStudent);
}

// Usage
printDetails("Alice", 25, 1.75, true);
```

## Return Values

Methods can return values using the `return` keyword:

```java
public static int add(int a, int b) {
    return a + b;
}

// Usage
int result = add(5, 3);
System.out.println(result);  // 8

// Or use directly
System.out.println(add(10, 20));  // 30
```

### More Examples

```java
public static double calculateArea(double radius) {
    return 3.14159 * radius * radius;
}

public static boolean isEven(int number) {
    return number % 2 == 0;
}

public static String getGreeting(String name) {
    return "Hello, " + name + "!";
}

// Usage
double area = calculateArea(5.0);      // 78.53975
boolean check = isEven(10);            // true
String message = getGreeting("Alice"); // "Hello, Alice!"
```

## Return Types

| Return Type | Description | Example |
|-------------|-------------|---------|
| `void` | Returns nothing | `public static void print()` |
| `int` | Returns an integer | `public static int add(int a, int b)` |
| `double` | Returns a decimal | `public static double divide(int a, int b)` |
| `boolean` | Returns true/false | `public static boolean isValid()` |
| `String` | Returns text | `public static String getName()` |

## Method Examples

### 1. Simple Methods

```java
public static void printLine() {
    System.out.println("====================");
}

public static void printStars(int count) {
    for (int i = 0; i < count; i++) {
        System.out.print("*");
    }
    System.out.println();
}

// Usage
printLine();        // ====================
printStars(5);      // *****
printStars(10);     // **********
```

### 2. Calculation Methods

```java
public static int square(int number) {
    return number * number;
}

public static double celsiusToFahrenheit(double celsius) {
    return (celsius * 9/5) + 32;
}

public static int max(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

// Usage
System.out.println(square(5));                    // 25
System.out.println(celsiusToFahrenheit(25));     // 77.0
System.out.println(max(10, 20));                 // 20
```

### 3. Validation Methods

```java
public static boolean isValidAge(int age) {
    return age >= 0 && age <= 120;
}

public static boolean isValidEmail(String email) {
    return email.contains("@") && email.contains(".");
}

public static boolean isPrime(int number) {
    if (number <= 1) return false;

    for (int i = 2; i <= Math.sqrt(number); i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}

// Usage
System.out.println(isValidAge(25));              // true
System.out.println(isValidEmail("test@mail.com")); // true
System.out.println(isPrime(17));                 // true
```

### 4. String Manipulation Methods

```java
public static String reverse(String text) {
    String reversed = "";
    for (int i = text.length() - 1; i >= 0; i--) {
        reversed += text.charAt(i);
    }
    return reversed;
}

public static int countVowels(String text) {
    int count = 0;
    String vowels = "aeiouAEIOU";

    for (int i = 0; i < text.length(); i++) {
        if (vowels.indexOf(text.charAt(i)) != -1) {
            count++;
        }
    }
    return count;
}

// Usage
System.out.println(reverse("hello"));       // olleh
System.out.println(countVowels("education")); // 5
```

## Method Overloading

You can have multiple methods with the same name but different parameters:

```java
public static int add(int a, int b) {
    return a + b;
}

public static double add(double a, double b) {
    return a + b;
}

public static int add(int a, int b, int c) {
    return a + b + c;
}

// Usage
System.out.println(add(5, 3));           // 8 (uses first method)
System.out.println(add(5.5, 3.2));       // 8.7 (uses second method)
System.out.println(add(1, 2, 3));        // 6 (uses third method)
```

Java determines which method to call based on the arguments you provide.

## Variable Scope in Methods

### Local Variables

Variables declared inside a method only exist within that method:

```java
public static void method1() {
    int x = 10;  // x only exists in method1
    System.out.println(x);
}

public static void method2() {
    // System.out.println(x);  // ERROR: x doesn't exist here
    int x = 20;  // This is a different x
    System.out.println(x);
}
```

### Parameters are Local

```java
public static void modifyValue(int number) {
    number = 100;  // Changes local copy only
    System.out.println("Inside method: " + number);
}

// Usage
int value = 10;
modifyValue(value);  // Inside method: 100
System.out.println("Outside method: " + value);  // 10 (unchanged)
```

## Best Practices

### 1. Descriptive Names

```java
// Bad
public static int calc(int a, int b) { }

// Good
public static int calculateTotal(int price, int quantity) { }
```

### 2. Single Responsibility

Each method should do one thing well:

```java
// Bad - does too much
public static void processUserData(String name, int age) {
    // Validate
    // Calculate
    // Save to database
    // Send email
}

// Good - separate concerns
public static boolean isValidUser(String name, int age) { }
public static void saveUser(String name, int age) { }
public static void sendWelcomeEmail(String name) { }
```

### 3. Keep Methods Short

Aim for methods that fit on one screen (around 15-20 lines).

### 4. Use Parameters, Not Global Variables

```java
// Bad
static int x = 10;
public static void process() {
    System.out.println(x);  // Uses global variable
}

// Good
public static void process(int x) {
    System.out.println(x);  // Uses parameter
}
```

## Common Mistakes

### 1. Missing Return Statement

```java
// Wrong
public static int add(int a, int b) {
    int sum = a + b;
    // Missing return!
}

// Correct
public static int add(int a, int b) {
    int sum = a + b;
    return sum;
}
```

### 2. Wrong Return Type

```java
// Wrong
public static void getSum(int a, int b) {
    return a + b;  // Error: void can't return a value
}

// Correct
public static int getSum(int a, int b) {
    return a + b;
}
```

### 3. Calling Before Definition

```java
public class Main {
    public static void main(String[] args) {
        sayHello();  // OK - method is defined below
    }

    public static void sayHello() {
        System.out.println("Hello!");
    }
}
```

## Practice Exercises

### 1. Temperature Converter

Create methods to convert between Celsius and Fahrenheit:
```java
public static double celsiusToFahrenheit(double celsius) {
    // Your code here
}

public static double fahrenheitToCelsius(double fahrenheit) {
    // Your code here
}
```

### 2. Number Utilities

Create these utility methods:
```java
public static boolean isEven(int number) { }
public static boolean isOdd(int number) { }
public static int factorial(int n) { }
public static boolean isPerfectSquare(int number) { }
```

### 3. String Utilities

```java
public static boolean isPalindrome(String text) {
    // Returns true if text reads the same forwards and backwards
}

public static String capitalize(String text) {
    // Returns text with first letter capitalised
}

public static int wordCount(String text) {
    // Returns number of words in text
}
```

### 4. Calculator

Create a simple calculator with methods:
```java
public static double add(double a, double b) { }
public static double subtract(double a, double b) { }
public static double multiply(double a, double b) { }
public static double divide(double a, double b) { }
```

## Key Takeaways

- Methods organise code into reusable blocks
- Use parameters to pass data to methods
- Use return values to get results from methods
- Methods should have descriptive names and do one thing well
- Variables inside methods are local to that method
- Method overloading allows multiple methods with the same name but different parameters
- Always match the return type with what the method returns

## Next Steps

Now that you understand the fundamentals of programming, you're ready to learn about Maven - the tool that helps you manage larger Java projects with multiple files and external libraries.
