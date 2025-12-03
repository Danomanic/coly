---
sidebar_position: 4
---

# Variables

Learn how to store and work with data in your Java programs using variables.

## What is a Variable?

A **variable** is a container that stores data in your program. Think of it like a labelled box where you can put information and retrieve it later.

```java
int age = 25;
String name = "Alice";
```

In the example above:
- `age` is a variable that stores the number 25
- `name` is a variable that stores the text "Alice"

## Declaring Variables

To create a variable in Java, you need to:
1. Specify the **type** (what kind of data it holds)
2. Give it a **name**
3. Optionally, assign it a **value**

### Syntax

```java
// Declaration only
int age;

// Declaration with initialisation
int age = 25;

// Multiple declarations
int x = 10, y = 20, z = 30;
```

## Variable Names

### Rules for Naming Variables

1. **Must start with**: a letter, underscore `_`, or dollar sign `$`
2. **Cannot start with**: a number
3. **Can contain**: letters, numbers, underscores, dollar signs
4. **Cannot use**: Java keywords (like `int`, `class`, `public`)
5. **Case-sensitive**: `age` and `Age` are different variables

### Good Naming Conventions

```java
// Good - descriptive and clear
int userAge = 25;
String firstName = "John";
double accountBalance = 1250.50;

// Bad - unclear meaning
int x = 25;
String s = "John";
double d = 1250.50;

// Use camelCase for variable names
int numberOfStudents = 30;  // Good
int number_of_students = 30; // Not Java convention
```

## Assigning Values

You can change a variable's value after declaring it:

```java
int score = 0;
System.out.println(score); // Prints: 0

score = 10;
System.out.println(score); // Prints: 10

score = score + 5;
System.out.println(score); // Prints: 15
```

## Variable Types

Variables can store different types of data:

```java
// Whole numbers
int age = 25;

// Decimal numbers
double price = 19.99;

// Text
String message = "Hello";

// True/false values
boolean isStudent = true;
```

We'll learn more about these types in the Data Types lesson.

## Constants

If you want a variable that never changes, use the `final` keyword:

```java
final double PI = 3.14159;
final int MAX_USERS = 100;

// This would cause an error:
// PI = 3.14; // Cannot change a final variable
```

Constants are typically written in UPPER_CASE.

## Variable Scope

Variables only exist within the block `{}` where they're declared:

```java
public class Example {
    public static void main(String[] args) {
        int x = 10; // x exists here

        if (true) {
            int y = 20; // y exists only inside this block
            System.out.println(x); // Can access x
            System.out.println(y); // Can access y
        }

        System.out.println(x); // Still can access x
        // System.out.println(y); // ERROR: y doesn't exist here
    }
}
```

## Common Mistakes

### 1. Using Before Declaring

```java
// Wrong
System.out.println(age); // Error: age doesn't exist yet
int age = 25;

// Correct
int age = 25;
System.out.println(age);
```

### 2. Not Initialising

```java
// Wrong
int score;
System.out.println(score); // Error: score has no value

// Correct
int score = 0;
System.out.println(score);
```

### 3. Wrong Type

```java
// Wrong
int age = "25"; // Error: can't store text in an int

// Correct
int age = 25;
String ageText = "25";
```

## Practice Exercise

Create a Java program that:

1. Declares variables for:
   - Your name (String)
   - Your age (int)
   - Your height in metres (double)
   - Whether you're a student (boolean)

2. Print each variable with a label:
   ```
   Name: Alice
   Age: 25
   Height: 1.75
   Student: true
   ```

3. Update your age by adding 1, then print it again

### Solution Template

```java
public class VariablesPractice {
    public static void main(String[] args) {
        // Declare your variables here

        // Print them out

        // Update age and print again
    }
}
```

## Key Takeaways

- Variables store data that can be used and changed in your program
- Every variable has a **type**, **name**, and **value**
- Use descriptive names in camelCase
- Variables only exist within their scope (the `{}` block they're declared in)
- Use `final` for values that shouldn't change

## Next Steps

Now that you understand variables, let's learn about the different data types you can store in them.
