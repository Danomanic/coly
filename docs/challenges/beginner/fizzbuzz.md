---
sidebar_position: 1
---

# FizzBuzz

A classic programming challenge that tests your understanding of loops and conditions.

## Difficulty
⭐ Beginner

## Problem Description

Write a program that prints the numbers from 1 to 100. But:
- For multiples of **3**, print "Fizz" instead of the number
- For multiples of **5**, print "Buzz" instead of the number
- For numbers that are multiples of **both 3 and 5**, print "FizzBuzz"

## Example Output

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
...
```

## Skills Practised

- Loops (`for` loop)
- Conditional statements (`if-else`)
- Modulus operator (`%`)
- Logical operators (`&&`)

## Test Cases

Your solution should produce:
- "Fizz" for: 3, 6, 9, 12, 18, 21, ...
- "Buzz" for: 5, 10, 20, 25, 35, ...
- "FizzBuzz" for: 15, 30, 45, 60, 75, 90
- The number itself for all other cases

## Hints

<details>
<summary>Hint 1: Checking for multiples</summary>

Use the modulus operator `%` to check if a number is divisible by another:
```java
if (number % 3 == 0) {
    // number is divisible by 3
}
```
</details>

<details>
<summary>Hint 2: Order matters</summary>

Check for multiples of both 3 and 5 first, before checking for just 3 or just 5:
```java
if (number % 3 == 0 && number % 5 == 0) {
    // Multiple of both
} else if (number % 3 == 0) {
    // Multiple of 3 only
}
```
</details>

<details>
<summary>Hint 3: Alternative approach</summary>

Instead of checking for both, you could check if a number is divisible by 15:
```java
if (number % 15 == 0) {
    System.out.println("FizzBuzz");
}
```
</details>

## Starter Code

```java
public class FizzBuzz {
    public static void main(String[] args) {
        // Write your code here
        for (int i = 1; i <= 100; i++) {
            // Your logic here
        }
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

```java
public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
```

**Alternative Solution (using method):**

```java
public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            System.out.println(fizzBuzz(i));
        }
    }

    public static String fizzBuzz(int number) {
        if (number % 15 == 0) {
            return "FizzBuzz";
        } else if (number % 3 == 0) {
            return "Fizz";
        } else if (number % 5 == 0) {
            return "Buzz";
        } else {
            return String.valueOf(number);
        }
    }
}
```

**Even Cleaner Solution:**

```java
public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            String output = "";

            if (i % 3 == 0) output += "Fizz";
            if (i % 5 == 0) output += "Buzz";
            if (output.isEmpty()) output = String.valueOf(i);

            System.out.println(output);
        }
    }
}
```

</details>

## Extension Challenges

Once you've completed the basic challenge, try these variations:

### 1. Custom Range
Modify the program to accept a start and end number as input, rather than always using 1-100.

### 2. Different Numbers
Change the rules to use different numbers (e.g., 7 and 11 instead of 3 and 5).

### 3. Three Numbers
Extend FizzBuzz to handle three numbers:
- Multiples of 3: "Fizz"
- Multiples of 5: "Buzz"
- Multiples of 7: "Boom"
- Multiples of 3 and 5: "FizzBuzz"
- Multiples of 3 and 7: "FizzBoom"
- Multiples of 5 and 7: "BuzzBoom"
- Multiples of all three: "FizzBuzzBoom"

### 4. Method-based Solution
Create a separate method `fizzBuzz(int number)` that returns a String, then call it in your loop.

## What You've Learned

After completing this challenge, you should understand:
- ✅ How to use loops to repeat operations
- ✅ How to check if numbers are divisible using modulus
- ✅ How to use conditional logic to make decisions
- ✅ The importance of condition ordering
- ✅ How to combine multiple conditions with logical operators

## Next Challenge

Try the **Palindrome Checker** challenge next to practise working with strings!
