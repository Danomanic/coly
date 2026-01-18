---
sidebar_position: 4
---

# Prime Number Checker

Determine whether a number is prime - a fundamental concept in mathematics and programming.

## Difficulty
⭐ Beginner

## Problem Description

Write a program that checks whether a given number is a prime number. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.

**Examples of prime numbers:**
- 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...

**Not prime numbers:**
- 1 (by definition)
- 4 (divisible by 2)
- 6 (divisible by 2 and 3)
- 9 (divisible by 3)

## Example Output

```
Input: 7
Output: true (7 is prime)

Input: 12
Output: false (12 is divisible by 2, 3, 4, 6)

Input: 2
Output: true (2 is the smallest prime)

Input: 1
Output: false (1 is not considered prime)
```

## Skills Practised

- Loops (`for` loop)
- Conditional statements
- Modulus operator (`%`)
- Mathematical reasoning
- Algorithm optimisation

## Requirements

1. Create a method `isPrime(int number)` that returns `boolean`
2. Return `true` if the number is prime, `false` otherwise
3. Handle edge cases: numbers less than 2 are not prime

## Test Cases

```java
isPrime(2)    // should return true
isPrime(3)    // should return true
isPrime(4)    // should return false
isPrime(7)    // should return true
isPrime(12)   // should return false
isPrime(17)   // should return true
isPrime(1)    // should return false
isPrime(0)    // should return false
isPrime(-5)   // should return false
```

## Hints

<details>
<summary>Hint 1: Basic approach</summary>

Check if any number from 2 to n-1 divides evenly:
```java
for (int i = 2; i < number; i++) {
    if (number % i == 0) {
        return false;  // Found a divisor
    }
}
return true;
```
</details>

<details>
<summary>Hint 2: Optimisation - only check up to square root</summary>

You only need to check divisors up to the square root of the number:
```java
for (int i = 2; i <= Math.sqrt(number); i++) {
    if (number % i == 0) {
        return false;
    }
}
```
Why? If n = a × b and a ≤ √n, then b ≥ √n. So one factor is always ≤ √n.
</details>

<details>
<summary>Hint 3: Handle edge cases first</summary>

Check special cases at the start:
```java
if (number <= 1) {
    return false;
}
if (number == 2) {
    return true;
}
```
</details>

## Starter Code

```java
public class PrimeChecker {
    public static void main(String[] args) {
        // Test your method
        System.out.println(isPrime(7));   // true
        System.out.println(isPrime(12));  // false
        System.out.println(isPrime(2));   // true
    }

    public static boolean isPrime(int number) {
        // Write your code here
        return false;
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

**Solution 1: Basic Approach**

```java
public class PrimeChecker {
    public static void main(String[] args) {
        System.out.println(isPrime(7));   // true
        System.out.println(isPrime(12));  // false
        System.out.println(isPrime(2));   // true
        System.out.println(isPrime(1));   // false
    }

    public static boolean isPrime(int number) {
        // Handle edge cases
        if (number <= 1) {
            return false;
        }

        // Check for divisors from 2 to number-1
        for (int i = 2; i < number; i++) {
            if (number % i == 0) {
                return false;
            }
        }

        return true;
    }
}
```

**Solution 2: Optimised with Square Root**

```java
public class PrimeChecker {
    public static void main(String[] args) {
        System.out.println(isPrime(7));      // true
        System.out.println(isPrime(12));     // false
        System.out.println(isPrime(997));    // true
        System.out.println(isPrime(1000));   // false
    }

    public static boolean isPrime(int number) {
        if (number <= 1) {
            return false;
        }
        if (number == 2) {
            return true;
        }
        if (number % 2 == 0) {
            return false;  // Even numbers > 2 are not prime
        }

        // Only check odd numbers up to square root
        for (int i = 3; i <= Math.sqrt(number); i += 2) {
            if (number % i == 0) {
                return false;
            }
        }

        return true;
    }
}
```

**Solution 3: Using i*i instead of sqrt**

```java
public static boolean isPrime(int number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 == 0 || number % 3 == 0) return false;

    // Check for factors of the form 6k ± 1
    for (int i = 5; i * i <= number; i += 6) {
        if (number % i == 0 || number % (i + 2) == 0) {
            return false;
        }
    }

    return true;
}
```

</details>

## How It Works

Let's check if 17 is prime:

| Divisor (i) | 17 % i | Result |
|-------------|--------|--------|
| 2           | 1      | Not divisible |
| 3           | 2      | Not divisible |
| 4           | 1      | Not divisible (√17 ≈ 4.1, we can stop here) |

Since no divisor was found, 17 is prime.

## Extension Challenges

### 1. Find All Primes
List all prime numbers up to n:
```java
listPrimes(20)  // [2, 3, 5, 7, 11, 13, 17, 19]
```

### 2. Prime Factorisation
Find all prime factors of a number:
```java
primeFactors(12)   // [2, 2, 3]
primeFactors(100)  // [2, 2, 5, 5]
```

### 3. Next Prime
Find the next prime number after n:
```java
nextPrime(10)  // 11
nextPrime(14)  // 17
```

### 4. Twin Primes
Find pairs of primes that differ by 2:
```java
twinPrimes(20)  // [(3,5), (5,7), (11,13), (17,19)]
```

### 5. Goldbach's Conjecture
Express an even number as sum of two primes:
```java
goldbach(10)  // [3, 7] or [5, 5]
goldbach(28)  // [5, 23] or [11, 17]
```

## What You've Learned

After completing this challenge, you should understand:
- ✅ How to check for divisibility using modulus
- ✅ The definition and properties of prime numbers
- ✅ How to optimise algorithms (square root optimisation)
- ✅ Why we only need to check up to √n
- ✅ Handling edge cases in mathematical problems

## Related Concepts

This challenge introduces you to:
- **Algorithm efficiency**: Basic vs optimised solutions
- **Number theory**: Prime numbers are fundamental in cryptography
- **Mathematical reasoning**: Understanding why optimisations work

## Next Challenge

Try the **Factorial Calculator** challenge to practise loops and large number handling!
