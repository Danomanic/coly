---
sidebar_position: 5
---

# Factorial Calculator

Calculate the factorial of a number - a classic recursion and loop problem.

## Difficulty
⭐ Beginner

## Problem Description

Write a program that calculates the factorial of a given non-negative integer. The factorial of a number n (written as n!) is the product of all positive integers less than or equal to n.

**Definition:**
- n! = n × (n-1) × (n-2) × ... × 2 × 1
- 0! = 1 (by definition)

**Examples:**
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- 3! = 3 × 2 × 1 = 6
- 1! = 1
- 0! = 1

## Example Output

```
Input: 5
Output: 120

Input: 0
Output: 1

Input: 10
Output: 3628800
```

## Skills Practised

- Loops (`for` loop)
- Recursion (alternative approach)
- Mathematical operations
- Edge case handling
- Understanding integer overflow

## Requirements

1. Create a method `factorial(int n)` that returns `long`
2. Return the factorial of the input number
3. Handle the edge case where n = 0 (return 1)
4. Assume input is non-negative

## Test Cases

```java
factorial(0)   // should return 1
factorial(1)   // should return 1
factorial(5)   // should return 120
factorial(10)  // should return 3628800
factorial(12)  // should return 479001600
factorial(20)  // should return 2432902008176640000
```

## Hints

<details>
<summary>Hint 1: Using a loop</summary>

Start with 1 and multiply by each number up to n:
```java
long result = 1;
for (int i = 1; i <= n; i++) {
    result *= i;
}
return result;
```
</details>

<details>
<summary>Hint 2: Using recursion</summary>

Factorial has a natural recursive definition:
- Base case: 0! = 1
- Recursive case: n! = n × (n-1)!

```java
if (n == 0) {
    return 1;
}
return n * factorial(n - 1);
```
</details>

<details>
<summary>Hint 3: Why use long?</summary>

Factorials grow very quickly. Using `int` would overflow after 12!
- 12! = 479,001,600 (fits in int)
- 13! = 6,227,020,800 (overflows int)

Even `long` overflows after 20!
</details>

## Starter Code

```java
public class FactorialCalculator {
    public static void main(String[] args) {
        // Test your method
        System.out.println(factorial(5));   // 120
        System.out.println(factorial(0));   // 1
        System.out.println(factorial(10));  // 3628800
    }

    public static long factorial(int n) {
        // Write your code here
        return 0;
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

**Solution 1: Iterative (Using Loop)**

```java
public class FactorialCalculator {
    public static void main(String[] args) {
        System.out.println(factorial(5));   // 120
        System.out.println(factorial(0));   // 1
        System.out.println(factorial(10));  // 3628800
        System.out.println(factorial(20));  // 2432902008176640000
    }

    public static long factorial(int n) {
        long result = 1;

        for (int i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }
}
```

**Solution 2: Recursive**

```java
public class FactorialCalculator {
    public static void main(String[] args) {
        System.out.println(factorial(5));   // 120
        System.out.println(factorial(0));   // 1
        System.out.println(factorial(10));  // 3628800
    }

    public static long factorial(int n) {
        // Base case
        if (n <= 1) {
            return 1;
        }

        // Recursive case
        return n * factorial(n - 1);
    }
}
```

**Solution 3: With Input Validation**

```java
public class FactorialCalculator {
    public static void main(String[] args) {
        System.out.println(factorial(5));   // 120
        System.out.println(factorial(-1));  // throws exception
    }

    public static long factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Factorial is not defined for negative numbers");
        }

        if (n > 20) {
            throw new ArithmeticException("Result would overflow long type");
        }

        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}
```

</details>

## How It Works

Let's trace factorial(5):

### Iterative Approach

| Step | i | result | Calculation |
|------|---|--------|-------------|
| Start| - | 1      | Initial value |
| 1    | 2 | 2      | 1 × 2 = 2 |
| 2    | 3 | 6      | 2 × 3 = 6 |
| 3    | 4 | 24     | 6 × 4 = 24 |
| 4    | 5 | 120    | 24 × 5 = 120 |

### Recursive Approach

```
factorial(5)
= 5 × factorial(4)
= 5 × 4 × factorial(3)
= 5 × 4 × 3 × factorial(2)
= 5 × 4 × 3 × 2 × factorial(1)
= 5 × 4 × 3 × 2 × 1
= 120
```

## Extension Challenges

### 1. Factorial Trailing Zeros
Count how many trailing zeros are in n!:
```java
trailingZeros(10)   // 2 (10! = 3628800)
trailingZeros(25)   // 6
trailingZeros(100)  // 24
```

<details>
<summary>Hint</summary>

Trailing zeros come from factors of 10, which come from pairs of 2 and 5.
Since there are always more 2s than 5s, count the 5s:
```java
int count = 0;
while (n >= 5) {
    n /= 5;
    count += n;
}
```
</details>

### 2. Double Factorial
Calculate n!! (product of all numbers with same parity):
```java
doubleFactorial(7)  // 7 × 5 × 3 × 1 = 105
doubleFactorial(8)  // 8 × 6 × 4 × 2 = 384
```

### 3. Combinations (n choose k)
Calculate C(n, k) = n! / (k! × (n-k)!):
```java
combinations(5, 2)  // 10
combinations(10, 3) // 120
```

### 4. Permutations
Calculate P(n, k) = n! / (n-k)!:
```java
permutations(5, 2)  // 20
permutations(10, 3) // 720
```

### 5. BigInteger Factorial
Handle arbitrarily large factorials:
```java
bigFactorial(100)  // A 158-digit number!
```

<details>
<summary>BigInteger Solution</summary>

```java
import java.math.BigInteger;

public static BigInteger bigFactorial(int n) {
    BigInteger result = BigInteger.ONE;
    for (int i = 2; i <= n; i++) {
        result = result.multiply(BigInteger.valueOf(i));
    }
    return result;
}
```
</details>

## Common Mistakes

### 1. Integer Overflow
```java
// Wrong - int overflows after 12!
public static int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;  // factorial(13) returns wrong value!
}

// Correct - use long
public static long factorial(int n) {
    // ...
}
```

### 2. Starting at Wrong Value
```java
// Wrong - starts multiplication at 0
long result = 0;
for (int i = 1; i <= n; i++) {
    result *= i;  // Always 0!
}

// Correct - start at 1
long result = 1;
```

### 3. Forgetting 0! = 1
```java
// Wrong - returns 0 for factorial(0)
for (int i = 1; i <= n; i++) {
    result *= i;
}
// If n=0, loop never runs, returns initial value

// With result = 1, this works correctly!
```

## What You've Learned

After completing this challenge, you should understand:
- ✅ How to calculate factorial using iteration
- ✅ How to implement recursive solutions
- ✅ The concept of integer overflow and when to use `long`
- ✅ Base cases in recursion
- ✅ How quickly factorials grow

## Related Concepts

This challenge introduces you to:
- **Recursion**: A function calling itself
- **Mathematical functions**: Factorial appears in combinatorics, probability
- **Data type limits**: Knowing when `int` isn't enough
- **Iteration vs Recursion**: Two approaches to the same problem

## Next Challenge

Try the **Array Average** challenge to practise working with arrays!
