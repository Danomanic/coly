---
sidebar_position: 3
---

# Sum of Digits

Calculate the sum of all digits in a number.

## Difficulty
⭐ Beginner

## Problem Description

Write a program that takes a number and returns the sum of all its digits.

For example:
- 123 → 1 + 2 + 3 = 6
- 4567 → 4 + 5 + 6 + 7 = 22
- 999 → 9 + 9 + 9 = 27

## Example Output

```
Input: 123
Output: 6

Input: 4567
Output: 22

Input: 999
Output: 27

Input: 0
Output: 0
```

## Skills Practised

- Loops (`while` loop)
- Modulus operator (`%`)
- Integer division (`/`)
- Mathematical operations

## Requirements

1. Create a method `sumOfDigits(int number)` that returns `int`
2. The method should return the sum of all digits in the number
3. Handle negative numbers by treating them as positive

## Test Cases

```java
sumOfDigits(123)     // should return 6
sumOfDigits(4567)    // should return 22
sumOfDigits(999)     // should return 27
sumOfDigits(0)       // should return 0
sumOfDigits(1)       // should return 1
sumOfDigits(-123)    // should return 6 (treat as positive)
```

## Hints

<details>
<summary>Hint 1: Getting the last digit</summary>

Use the modulus operator to get the last digit:
```java
int lastDigit = number % 10;
// 123 % 10 = 3
// 456 % 10 = 6
```
</details>

<details>
<summary>Hint 2: Removing the last digit</summary>

Use integer division to remove the last digit:
```java
number = number / 10;
// 123 / 10 = 12
// 12 / 10 = 1
// 1 / 10 = 0
```
</details>

<details>
<summary>Hint 3: The algorithm</summary>

Keep extracting and summing digits until the number becomes 0:
```java
int sum = 0;
while (number > 0) {
    sum += number % 10;  // Add last digit
    number = number / 10; // Remove last digit
}
return sum;
```
</details>

<details>
<summary>Hint 4: Handling negative numbers</summary>

Convert negative numbers to positive using `Math.abs()`:
```java
number = Math.abs(number);
```
</details>

## Starter Code

```java
public class SumOfDigits {
    public static void main(String[] args) {
        // Test your method
        System.out.println(sumOfDigits(123));    // 6
        System.out.println(sumOfDigits(4567));   // 22
        System.out.println(sumOfDigits(999));    // 27
    }

    public static int sumOfDigits(int number) {
        // Write your code here
        return 0;
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

**Solution 1: Using While Loop**

```java
public class SumOfDigits {
    public static void main(String[] args) {
        System.out.println(sumOfDigits(123));    // 6
        System.out.println(sumOfDigits(4567));   // 22
        System.out.println(sumOfDigits(999));    // 27
        System.out.println(sumOfDigits(-123));   // 6
    }

    public static int sumOfDigits(int number) {
        // Handle negative numbers
        number = Math.abs(number);

        int sum = 0;

        while (number > 0) {
            sum += number % 10;  // Add the last digit
            number /= 10;         // Remove the last digit
        }

        return sum;
    }
}
```

**Solution 2: Using String Conversion**

```java
public class SumOfDigits {
    public static void main(String[] args) {
        System.out.println(sumOfDigits(123));    // 6
        System.out.println(sumOfDigits(4567));   // 22
        System.out.println(sumOfDigits(999));    // 27
    }

    public static int sumOfDigits(int number) {
        // Convert to positive and then to string
        String numStr = String.valueOf(Math.abs(number));
        int sum = 0;

        for (int i = 0; i < numStr.length(); i++) {
            // Convert character to digit and add to sum
            sum += numStr.charAt(i) - '0';
        }

        return sum;
    }
}
```

**Solution 3: Recursive (Advanced)**

```java
public class SumOfDigits {
    public static void main(String[] args) {
        System.out.println(sumOfDigits(123));    // 6
        System.out.println(sumOfDigits(4567));   // 22
        System.out.println(sumOfDigits(999));    // 27
    }

    public static int sumOfDigits(int number) {
        number = Math.abs(number);

        // Base case
        if (number == 0) {
            return 0;
        }

        // Recursive case: last digit + sum of remaining digits
        return (number % 10) + sumOfDigits(number / 10);
    }
}
```

</details>

## How It Works

Let's trace through the algorithm with `number = 123`:

| Step | number | number % 10 (last digit) | sum | number / 10 (remaining) |
|------|--------|--------------------------|-----|-------------------------|
| 1    | 123    | 3                        | 3   | 12                      |
| 2    | 12     | 2                        | 5   | 1                       |
| 3    | 1      | 1                        | 6   | 0                       |
| 4    | 0      | (loop ends)              | 6   | -                       |

## Extension Challenges

### 1. Product of Digits
Instead of sum, calculate the product of all digits:
```java
productOfDigits(123)   // 1 × 2 × 3 = 6
productOfDigits(456)   // 4 × 5 × 6 = 120
```

### 2. Count Digits
Count how many digits are in a number:
```java
countDigits(123)    // 3
countDigits(4567)   // 4
countDigits(0)      // 1
```

### 3. Reverse Number
Reverse the digits of a number:
```java
reverseNumber(123)   // 321
reverseNumber(4567)  // 7654
reverseNumber(1000)  // 1
```

### 4. Digital Root
Keep summing digits until you get a single digit:
```java
digitalRoot(123)    // 1+2+3=6, result: 6
digitalRoot(456)    // 4+5+6=15, 1+5=6, result: 6
digitalRoot(999)    // 9+9+9=27, 2+7=9, result: 9
```

<details>
<summary>Digital Root Solution</summary>

```java
public static int digitalRoot(int number) {
    number = Math.abs(number);

    while (number >= 10) {
        number = sumOfDigits(number);
    }

    return number;
}
```
</details>

### 5. Armstrong Number
Check if a number equals the sum of its digits raised to the power of the number of digits:
```java
isArmstrong(153)   // 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 → true
isArmstrong(9474)  // 9⁴ + 4⁴ + 7⁴ + 4⁴ = 9474 → true
isArmstrong(123)   // 1³ + 2³ + 3³ = 1 + 8 + 27 = 36 ≠ 123 → false
```

## What You've Learned

After completing this challenge, you should understand:
- ✅ How to extract digits from a number using modulus
- ✅ How to remove digits using integer division
- ✅ The pattern of processing digits one by one
- ✅ Using `Math.abs()` to handle negative numbers
- ✅ Converting between numbers and strings (alternative approach)

## Related Concepts

This challenge introduces you to:
- **Digit manipulation**: A common technique in many problems
- **While loops**: Useful when you don't know iteration count
- **Mathematical operations**: Using `%` and `/` together
- **Recursion**: An alternative approach to iteration

## Next Challenge

Try the **Prime Number Checker** challenge to practise loops and conditions together!
