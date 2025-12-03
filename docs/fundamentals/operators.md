---
sidebar_position: 6
---

# Operators

Learn how to perform calculations, comparisons, and logical operations in Java.

## What are Operators?

**Operators** are symbols that perform operations on variables and values. They're the building blocks for creating expressions and making decisions in your programs.

```java
int sum = 5 + 3;        // + is an operator
boolean isEqual = (x == y); // == is an operator
```

## Arithmetic Operators

Perform mathematical calculations:

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division | `6 / 3` | `2` |
| `%` | Modulus (remainder) | `5 % 2` | `1` |

### Examples

```java
int a = 10;
int b = 3;

System.out.println(a + b);  // 13
System.out.println(a - b);  // 7
System.out.println(a * b);  // 30
System.out.println(a / b);  // 3 (integer division)
System.out.println(a % b);  // 1 (remainder)
```

### Integer vs Decimal Division

```java
int x = 7;
int y = 2;
System.out.println(x / y);     // 3 (integer division, decimal part lost)

double z = 7.0;
double w = 2.0;
System.out.println(z / w);     // 3.5 (decimal division)

// Mix int and double
System.out.println(7 / 2.0);   // 3.5 (result is double)
```

### The Modulus Operator

The `%` operator gives you the remainder after division:

```java
System.out.println(10 % 3);  // 1 (10 ÷ 3 = 3 remainder 1)
System.out.println(15 % 4);  // 3 (15 ÷ 4 = 3 remainder 3)
System.out.println(8 % 2);   // 0 (8 ÷ 2 = 4 remainder 0)

// Useful for checking if a number is even
int number = 10;
if (number % 2 == 0) {
    System.out.println("Even");
}
```

## Assignment Operators

Assign values to variables:

| Operator | Example | Equivalent To |
|----------|---------|---------------|
| `=` | `x = 5` | `x = 5` |
| `+=` | `x += 3` | `x = x + 3` |
| `-=` | `x -= 3` | `x = x - 3` |
| `*=` | `x *= 3` | `x = x * 3` |
| `/=` | `x /= 3` | `x = x / 3` |
| `%=` | `x %= 3` | `x = x % 3` |

### Examples

```java
int score = 10;

score += 5;   // score is now 15
score -= 3;   // score is now 12
score *= 2;   // score is now 24
score /= 4;   // score is now 6
score %= 4;   // score is now 2
```

## Comparison Operators

Compare two values and return `true` or `false`:

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `==` | Equal to | `5 == 5` | `true` |
| `!=` | Not equal to | `5 != 3` | `true` |
| `>` | Greater than | `5 > 3` | `true` |
| `<` | Less than | `5 < 3` | `false` |
| `>=` | Greater than or equal to | `5 >= 5` | `true` |
| `<=` | Less than or equal to | `5 <= 3` | `false` |

### Examples

```java
int age = 18;

System.out.println(age == 18);  // true
System.out.println(age != 21);  // true
System.out.println(age > 16);   // true
System.out.println(age < 21);   // true
System.out.println(age >= 18);  // true
System.out.println(age <= 17);  // false
```

:::warning
Use `==` for comparison, not `=` (which is assignment)!
```java
if (x = 5) { }   // Wrong! This assigns 5 to x
if (x == 5) { }  // Correct! This compares x to 5
```
:::

## Logical Operators

Combine boolean expressions:

| Operator | Name | Description | Example |
|----------|------|-------------|---------|
| `&&` | AND | Both must be true | `(x > 5 && x < 10)` |
| `\|\|` | OR | At least one must be true | `(x < 5 \|\| x > 10)` |
| `!` | NOT | Reverses the boolean | `!(x == 5)` |

### AND Operator (`&&`)

Both conditions must be true:

```java
int age = 25;
boolean hasLicence = true;

// Can drive if 18+ AND has licence
if (age >= 18 && hasLicence) {
    System.out.println("Can drive");
}
```

| Expression | Result |
|------------|--------|
| `true && true` | `true` |
| `true && false` | `false` |
| `false && true` | `false` |
| `false && false` | `false` |

### OR Operator (`||`)

At least one condition must be true:

```java
int day = 6; // Saturday

// Weekend if Saturday OR Sunday
if (day == 6 || day == 7) {
    System.out.println("It's the weekend!");
}
```

| Expression | Result |
|------------|--------|
| `true \|\| true` | `true` |
| `true \|\| false` | `true` |
| `false \|\| true` | `true` |
| `false \|\| false` | `false` |

### NOT Operator (`!`)

Reverses the boolean value:

```java
boolean isRaining = false;

if (!isRaining) {
    System.out.println("Go for a walk");
}
```

| Expression | Result |
|------------|--------|
| `!true` | `false` |
| `!false` | `true` |

### Combining Logical Operators

```java
int age = 25;
boolean isStudent = true;
boolean hasJob = false;

// Complex conditions
if ((age >= 18 && age <= 25) && (isStudent || hasJob)) {
    System.out.println("Eligible for discount");
}
```

## Increment and Decrement Operators

Shorthand for adding or subtracting 1:

| Operator | Name | Example | Equivalent To |
|----------|------|---------|---------------|
| `++` | Increment | `x++` | `x = x + 1` |
| `--` | Decrement | `x--` | `x = x - 1` |

### Examples

```java
int count = 5;

count++;  // count is now 6
count++;  // count is now 7
count--;  // count is now 6
```

### Prefix vs Postfix

```java
int x = 5;

int a = x++;  // Postfix: a = 5, then x becomes 6
int b = ++x;  // Prefix: x becomes 7, then b = 7

System.out.println(a);  // 5
System.out.println(b);  // 7
System.out.println(x);  // 7
```

## Operator Precedence

Operations are performed in a specific order (like BODMAS/PEMDAS in maths):

1. **Parentheses**: `()`
2. **Increment/Decrement**: `++`, `--`
3. **Multiplication/Division/Modulus**: `*`, `/`, `%`
4. **Addition/Subtraction**: `+`, `-`
5. **Comparison**: `<`, `>`, `<=`, `>=`
6. **Equality**: `==`, `!=`
7. **Logical AND**: `&&`
8. **Logical OR**: `||`
9. **Assignment**: `=`, `+=`, `-=`, etc.

### Examples

```java
int result = 5 + 3 * 2;        // 11 (not 16)
// 3 * 2 is calculated first, then + 5

int result = (5 + 3) * 2;      // 16
// Parentheses force addition first

boolean test = 10 > 5 && 3 < 7;  // true
// 10 > 5 is true, 3 < 7 is true, true && true = true
```

:::tip
When in doubt, use parentheses to make your intentions clear!
:::

## Common Mistakes

### 1. Confusing `=` and `==`

```java
// Wrong
if (x = 5) { }  // This assigns 5 to x (compilation error)

// Correct
if (x == 5) { } // This compares x to 5
```

### 2. Integer Division

```java
// Wrong expectation
int result = 7 / 2;  // Result is 3, not 3.5

// Correct for decimal result
double result = 7.0 / 2.0;  // Result is 3.5
```

### 3. Logical Operator Order

```java
// This won't work as expected
if (age >= 18 && age <= 65 && !isRetired) {
    // Better to use parentheses for clarity
}

// Clearer
if ((age >= 18 && age <= 65) && !isRetired) {
    // ...
}
```

## Practice Exercise

Create a program that uses different operators:

```java
public class OperatorsPractice {
    public static void main(String[] args) {
        // Arithmetic
        int a = 15;
        int b = 4;
        System.out.println("Sum: " + (a + b));
        System.out.println("Difference: " + (a - b));
        System.out.println("Product: " + (a * b));
        System.out.println("Quotient: " + (a / b));
        System.out.println("Remainder: " + (a % b));

        // Comparison
        System.out.println("Is a greater than b? " + (a > b));
        System.out.println("Is a equal to b? " + (a == b));

        // Logical
        boolean isAdult = a >= 18;
        boolean hasPermission = true;
        System.out.println("Can proceed? " + (isAdult && hasPermission));

        // Increment/Decrement
        int counter = 10;
        counter++;
        System.out.println("Counter: " + counter);
    }
}
```

### Challenges

1. Write a program that checks if a number is even or odd using the `%` operator
2. Create a calculator that takes two numbers and performs all arithmetic operations
3. Check if a year is a leap year (divisible by 4, but not by 100, unless also by 400)

## Key Takeaways

- **Arithmetic operators** (`+`, `-`, `*`, `/`, `%`) perform maths calculations
- **Comparison operators** (`==`, `!=`, `>`, `<`, `>=`, `<=`) compare values
- **Logical operators** (`&&`, `||`, `!`) combine boolean expressions
- **Assignment operators** (`=`, `+=`, `-=`, etc.) assign values
- Use parentheses to control the order of operations
- Integer division drops the decimal part

## Next Steps

Now that you understand operators, let's learn about conditions - how to make decisions in your code based on these comparisons.
