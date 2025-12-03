---
sidebar_position: 7
---

# Conditions

Learn how to make decisions in your code using conditional statements.

## What are Conditions?

**Conditions** allow your program to make decisions and execute different code based on whether something is true or false. They're the foundation of program logic.

Think of it like a flowchart: "If it's raining, take an umbrella. Otherwise, wear sunglasses."

## The `if` Statement

The most basic conditional statement:

```java
if (condition) {
    // Code runs only if condition is true
}
```

### Example

```java
int age = 18;

if (age >= 18) {
    System.out.println("You can vote");
}
```

## The `if-else` Statement

Provide an alternative when the condition is false:

```java
if (condition) {
    // Runs if condition is true
} else {
    // Runs if condition is false
}
```

### Example

```java
int temperature = 15;

if (temperature > 20) {
    System.out.println("It's warm outside");
} else {
    System.out.println("It's cold outside");
}
```

## The `if-else if-else` Statement

Check multiple conditions:

```java
if (condition1) {
    // Runs if condition1 is true
} else if (condition2) {
    // Runs if condition1 is false and condition2 is true
} else if (condition3) {
    // Runs if condition1 and condition2 are false and condition3 is true
} else {
    // Runs if all conditions are false
}
```

### Example

```java
int score = 75;

if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else if (score >= 60) {
    System.out.println("Grade: D");
} else {
    System.out.println("Grade: F");
}
```

## Nested `if` Statements

You can put `if` statements inside other `if` statements:

```java
int age = 25;
boolean hasLicence = true;

if (age >= 18) {
    if (hasLicence) {
        System.out.println("You can drive");
    } else {
        System.out.println("You need a licence");
    }
} else {
    System.out.println("You're too young to drive");
}
```

:::tip
Try to limit nesting to 2-3 levels. Too much nesting makes code hard to read!
:::

## The Ternary Operator

A shorthand for simple `if-else` statements:

```java
variable = (condition) ? valueIfTrue : valueIfFalse;
```

### Example

```java
int age = 20;
String status = (age >= 18) ? "Adult" : "Minor";
System.out.println(status);  // "Adult"

// Equivalent to:
String status;
if (age >= 18) {
    status = "Adult";
} else {
    status = "Minor";
}
```

### More Examples

```java
int a = 5;
int b = 10;
int max = (a > b) ? a : b;  // max = 10

String message = (score >= 50) ? "Pass" : "Fail";

int absoluteValue = (number >= 0) ? number : -number;
```

## The `switch` Statement

Used when you have multiple specific values to check:

```java
switch (variable) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    default:
        // Code if no cases match
}
```

### Example

```java
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

System.out.println(dayName);  // "Wednesday"
```

### Multiple Cases

You can group cases together:

```java
int month = 12;

switch (month) {
    case 12:
    case 1:
    case 2:
        System.out.println("Winter");
        break;
    case 3:
    case 4:
    case 5:
        System.out.println("Spring");
        break;
    case 6:
    case 7:
    case 8:
        System.out.println("Summer");
        break;
    case 9:
    case 10:
    case 11:
        System.out.println("Autumn");
        break;
    default:
        System.out.println("Invalid month");
}
```

:::warning
Don't forget the `break` statement! Without it, execution "falls through" to the next case.
:::

## Comparing Strings

Use `.equals()` to compare strings, not `==`:

```java
String name = "Alice";

// Wrong
if (name == "Alice") {  // Don't use == for strings!
    System.out.println("Hello Alice");
}

// Correct
if (name.equals("Alice")) {
    System.out.println("Hello Alice");
}

// Case-insensitive comparison
if (name.equalsIgnoreCase("alice")) {
    System.out.println("Hello Alice");
}
```

## Complex Conditions

Combine multiple conditions using logical operators:

```java
int age = 25;
double salary = 30000;
boolean hasExperience = true;

// AND - all must be true
if (age >= 18 && salary > 25000 && hasExperience) {
    System.out.println("Eligible for loan");
}

// OR - at least one must be true
if (age < 18 || age > 65) {
    System.out.println("Special ticket discount");
}

// Combining AND and OR with parentheses
if ((age >= 18 && age <= 65) && (hasExperience || salary > 40000)) {
    System.out.println("Eligible for programme");
}
```

## When to Use Each

### Use `if-else` when:
- Checking ranges or complex conditions
- Conditions involve comparisons (`>`, `<`, `>=`, `<=`)

```java
if (temperature > 30) {
    System.out.println("Hot");
} else if (temperature > 20) {
    System.out.println("Warm");
} else {
    System.out.println("Cold");
}
```

### Use `switch` when:
- Checking a single variable against specific values
- You have many exact matches to check

```java
switch (userChoice) {
    case 1:
        startGame();
        break;
    case 2:
        viewScores();
        break;
    case 3:
        exitGame();
        break;
}
```

### Use ternary operator when:
- Simple condition with short expressions
- Assigning one of two values

```java
String message = (isLoggedIn) ? "Welcome back" : "Please log in";
```

## Common Mistakes

### 1. Using `=` Instead of `==`

```java
// Wrong
if (age = 18) {  // This assigns 18 to age!
    System.out.println("Adult");
}

// Correct
if (age == 18) {
    System.out.println("Adult");
}
```

### 2. Comparing Strings with `==`

```java
// Wrong
if (name == "Alice") {  // Compares references, not values
    System.out.println("Hello");
}

// Correct
if (name.equals("Alice")) {
    System.out.println("Hello");
}
```

### 3. Forgetting `break` in Switch

```java
// Wrong - will print multiple cases
switch (day) {
    case 1:
        System.out.println("Monday");
        // Missing break!
    case 2:
        System.out.println("Tuesday");
        break;
}

// Correct
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
}
```

### 4. Unreachable Code

```java
// Wrong - second condition never checked
if (score >= 60) {
    System.out.println("Pass");
} else if (score >= 80) {  // Never reached!
    System.out.println("Distinction");
}

// Correct - order matters!
if (score >= 80) {
    System.out.println("Distinction");
} else if (score >= 60) {
    System.out.println("Pass");
}
```

## Practice Exercise

Create a program that determines ticket prices based on age:

```java
public class TicketPrice {
    public static void main(String[] args) {
        int age = 25;
        double price;

        // Children (0-12): £5
        // Teenagers (13-17): £8
        // Adults (18-64): £12
        // Seniors (65+): £7

        // Write your if-else statements here

        System.out.println("Ticket price: £" + price);
    }
}
```

### Challenge Problems

1. **Grade Calculator**: Write a program that takes a score (0-100) and prints the letter grade (A, B, C, D, F)

2. **Leap Year Checker**: Determine if a year is a leap year:
   - Divisible by 4 → leap year
   - BUT if divisible by 100 → not a leap year
   - UNLESS also divisible by 400 → leap year

3. **Number Classifier**: Check if a number is:
   - Positive, negative, or zero
   - Even or odd
   - Greater than, less than, or equal to 100

4. **Menu System**: Create a simple menu with switch statement:
   ```
   1. Start Game
   2. Load Game
   3. Options
   4. Exit
   ```

## Key Takeaways

- Use `if-else` for making decisions based on conditions
- Use `else if` to check multiple conditions
- Use `switch` for checking a variable against specific values
- Use the ternary operator for simple conditions
- Always use `.equals()` to compare strings
- Order matters in `if-else if` chains - put most specific conditions first
- Don't forget `break` statements in `switch`

## Next Steps

Now that you can make decisions in your code, let's learn about loops - how to repeat actions multiple times.
