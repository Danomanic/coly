---
sidebar_position: 1
---

# Array Average

Calculate the average of numbers in an array - a fundamental array operation.

## Difficulty
⭐⭐ Intermediate

## Problem Description

Write a program that calculates the average (mean) of all numbers in an array. The average is the sum of all elements divided by the number of elements.

**Formula:** average = sum of elements / number of elements

## Example Output

```
Input: [10, 20, 30, 40, 50]
Output: 30.0

Input: [5, 10, 15]
Output: 10.0

Input: [7]
Output: 7.0

Input: []
Output: 0.0 (or handle as error)
```

## Skills Practised

- Array traversal
- Loops
- Mathematical operations
- Edge case handling
- Working with floating-point numbers

## Requirements

1. Create a method `average(int[] numbers)` that returns `double`
2. Return the average of all numbers in the array
3. Handle empty arrays appropriately (return 0.0 or throw an exception)

## Test Cases

```java
average(new int[]{10, 20, 30, 40, 50})  // should return 30.0
average(new int[]{5, 10, 15})           // should return 10.0
average(new int[]{7})                   // should return 7.0
average(new int[]{1, 2, 3, 4})          // should return 2.5
average(new int[]{})                    // should return 0.0 or throw
average(new int[]{-10, 10})             // should return 0.0
```

## Hints

<details>
<summary>Hint 1: Summing array elements</summary>

Use a loop to add up all elements:
```java
int sum = 0;
for (int num : numbers) {
    sum += num;
}
```
</details>

<details>
<summary>Hint 2: Integer division trap</summary>

Be careful with integer division! Divide by a double:
```java
// Wrong - integer division
int average = sum / numbers.length;  // 5/2 = 2, not 2.5

// Correct - cast to double
double average = (double) sum / numbers.length;
```
</details>

<details>
<summary>Hint 3: Empty array check</summary>

Always check for empty arrays to avoid division by zero:
```java
if (numbers.length == 0) {
    return 0.0;  // or throw new IllegalArgumentException()
}
```
</details>

## Starter Code

```java
public class ArrayAverage {
    public static void main(String[] args) {
        // Test your method
        System.out.println(average(new int[]{10, 20, 30, 40, 50}));  // 30.0
        System.out.println(average(new int[]{5, 10, 15}));           // 10.0
        System.out.println(average(new int[]{1, 2, 3, 4}));          // 2.5
    }

    public static double average(int[] numbers) {
        // Write your code here
        return 0.0;
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

**Solution 1: Enhanced For Loop**

```java
public class ArrayAverage {
    public static void main(String[] args) {
        System.out.println(average(new int[]{10, 20, 30, 40, 50}));  // 30.0
        System.out.println(average(new int[]{5, 10, 15}));           // 10.0
        System.out.println(average(new int[]{1, 2, 3, 4}));          // 2.5
        System.out.println(average(new int[]{}));                    // 0.0
    }

    public static double average(int[] numbers) {
        if (numbers == null || numbers.length == 0) {
            return 0.0;
        }

        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }

        return (double) sum / numbers.length;
    }
}
```

**Solution 2: Traditional For Loop**

```java
public static double average(int[] numbers) {
    if (numbers == null || numbers.length == 0) {
        return 0.0;
    }

    int sum = 0;
    for (int i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }

    return (double) sum / numbers.length;
}
```

**Solution 3: Using Streams (Java 8+)**

```java
import java.util.Arrays;

public static double average(int[] numbers) {
    if (numbers == null || numbers.length == 0) {
        return 0.0;
    }

    return Arrays.stream(numbers).average().orElse(0.0);
}
```

**Solution 4: With Long Sum (Handles Overflow)**

```java
public static double average(int[] numbers) {
    if (numbers == null || numbers.length == 0) {
        return 0.0;
    }

    long sum = 0;  // Use long to prevent overflow
    for (int num : numbers) {
        sum += num;
    }

    return (double) sum / numbers.length;
}
```

</details>

## Common Mistakes

### 1. Integer Division
```java
// Wrong - loses decimal precision
return sum / numbers.length;  // 5/2 = 2, not 2.5

// Correct
return (double) sum / numbers.length;  // 5/2.0 = 2.5
```

### 2. Division by Zero
```java
// Wrong - crashes on empty array
return (double) sum / numbers.length;

// Correct
if (numbers.length == 0) {
    return 0.0;
}
return (double) sum / numbers.length;
```

### 3. Integer Overflow
```java
// Risk with large arrays of large numbers
int sum = 0;  // Can overflow

// Safer with long
long sum = 0L;
```

## Extension Challenges

### 1. Find Minimum and Maximum
Return both the min and max values in an array:
```java
int[] minMax(int[] numbers)  // returns [min, max]
minMax(new int[]{3, 1, 4, 1, 5})  // [1, 5]
```

### 2. Median
Find the middle value when sorted:
```java
median(new int[]{3, 1, 4, 1, 5})  // 3.0
median(new int[]{1, 2, 3, 4})     // 2.5 (average of 2 and 3)
```

### 3. Mode
Find the most frequently occurring value:
```java
mode(new int[]{1, 2, 2, 3, 3, 3})  // 3
```

### 4. Standard Deviation
Calculate how spread out the numbers are:
```java
standardDeviation(new int[]{2, 4, 4, 4, 5, 5, 7, 9})  // ~2.0
```

### 5. Moving Average
Calculate rolling average with a window size:
```java
movingAverage(new int[]{1, 2, 3, 4, 5}, 3)  // [2.0, 3.0, 4.0]
```

## What You've Learned

After completing this challenge, you should understand:
- ✅ How to iterate through arrays
- ✅ How to accumulate values in a loop
- ✅ The difference between integer and floating-point division
- ✅ How to handle edge cases like empty arrays
- ✅ The importance of type casting

## Related Concepts

This challenge builds on:
- **Array fundamentals**: Accessing and iterating elements
- **Type conversion**: Casting between int and double
- **Edge cases**: Empty arrays, null checks
- **Mathematical operations**: Sum and division

## Next Challenge

Try the **Anagram Checker** challenge to practise string manipulation with arrays!
