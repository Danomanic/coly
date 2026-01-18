---
sidebar_position: 3
---

# Binary Search

Implement binary search - one of the most important algorithms in computer science.

## Difficulty
⭐⭐ Intermediate

## Problem Description

Write a program that implements binary search to find the index of a target value in a sorted array. Binary search works by repeatedly dividing the search interval in half, making it much faster than linear search for large arrays.

**Key requirement:** The array must be sorted in ascending order.

## Example Output

```
Input: array = [1, 3, 5, 7, 9, 11, 13], target = 7
Output: 3 (index of 7)

Input: array = [1, 3, 5, 7, 9, 11, 13], target = 6
Output: -1 (not found)

Input: array = [2, 4, 6, 8, 10], target = 2
Output: 0 (first element)
```

## Skills Practised

- Algorithm design
- Divide and conquer
- Array manipulation
- Loop conditions
- Recursion (alternative approach)

## Requirements

1. Create a method `binarySearch(int[] array, int target)` that returns `int`
2. Return the index of the target if found
3. Return -1 if the target is not in the array
4. Assume the input array is sorted in ascending order

## Test Cases

```java
binarySearch(new int[]{1, 3, 5, 7, 9, 11, 13}, 7)   // 3
binarySearch(new int[]{1, 3, 5, 7, 9, 11, 13}, 1)   // 0
binarySearch(new int[]{1, 3, 5, 7, 9, 11, 13}, 13)  // 6
binarySearch(new int[]{1, 3, 5, 7, 9, 11, 13}, 6)   // -1
binarySearch(new int[]{1}, 1)                       // 0
binarySearch(new int[]{1}, 2)                       // -1
binarySearch(new int[]{}, 5)                        // -1
```

## How Binary Search Works

1. Start with the entire array
2. Find the middle element
3. If middle equals target, return the index
4. If target is less than middle, search the left half
5. If target is greater than middle, search the right half
6. Repeat until found or search space is empty

**Example:** Finding 7 in [1, 3, 5, 7, 9, 11, 13]

```
Step 1: [1, 3, 5, 7, 9, 11, 13]  mid=7 → Found!
               ↑
              mid
```

**Example:** Finding 3 in [1, 3, 5, 7, 9, 11, 13]

```
Step 1: [1, 3, 5, 7, 9, 11, 13]  mid=7 → 3 < 7, search left
               ↑
Step 2: [1, 3, 5]                 mid=3 → Found!
            ↑
```

## Hints

<details>
<summary>Hint 1: Setting up pointers</summary>

Use two pointers to track the search boundaries:
```java
int left = 0;
int right = array.length - 1;
```
</details>

<details>
<summary>Hint 2: Finding the middle</summary>

Calculate middle index carefully to avoid overflow:
```java
int mid = left + (right - left) / 2;
// NOT: (left + right) / 2  // Can overflow for large values
```
</details>

<details>
<summary>Hint 3: Loop condition</summary>

Continue while there's a valid search range:
```java
while (left <= right) {
    // search logic
}
```
</details>

<details>
<summary>Hint 4: Updating boundaries</summary>

Move left or right pointer based on comparison:
```java
if (array[mid] < target) {
    left = mid + 1;      // Search right half
} else if (array[mid] > target) {
    right = mid - 1;     // Search left half
} else {
    return mid;          // Found!
}
```
</details>

## Starter Code

```java
public class BinarySearch {
    public static void main(String[] args) {
        int[] array = {1, 3, 5, 7, 9, 11, 13};

        System.out.println(binarySearch(array, 7));   // 3
        System.out.println(binarySearch(array, 1));   // 0
        System.out.println(binarySearch(array, 6));   // -1
    }

    public static int binarySearch(int[] array, int target) {
        // Write your code here
        return -1;
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

**Solution 1: Iterative**

```java
public class BinarySearch {
    public static void main(String[] args) {
        int[] array = {1, 3, 5, 7, 9, 11, 13};

        System.out.println(binarySearch(array, 7));   // 3
        System.out.println(binarySearch(array, 1));   // 0
        System.out.println(binarySearch(array, 13));  // 6
        System.out.println(binarySearch(array, 6));   // -1
    }

    public static int binarySearch(int[] array, int target) {
        if (array == null || array.length == 0) {
            return -1;
        }

        int left = 0;
        int right = array.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (array[mid] == target) {
                return mid;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }
}
```

**Solution 2: Recursive**

```java
public class BinarySearch {
    public static void main(String[] args) {
        int[] array = {1, 3, 5, 7, 9, 11, 13};

        System.out.println(binarySearch(array, 7));   // 3
        System.out.println(binarySearch(array, 6));   // -1
    }

    public static int binarySearch(int[] array, int target) {
        if (array == null || array.length == 0) {
            return -1;
        }
        return binarySearchRecursive(array, target, 0, array.length - 1);
    }

    private static int binarySearchRecursive(int[] array, int target, int left, int right) {
        if (left > right) {
            return -1;
        }

        int mid = left + (right - left) / 2;

        if (array[mid] == target) {
            return mid;
        } else if (array[mid] < target) {
            return binarySearchRecursive(array, target, mid + 1, right);
        } else {
            return binarySearchRecursive(array, target, left, mid - 1);
        }
    }
}
```

**Solution 3: Using Java's Built-in Method**

```java
import java.util.Arrays;

public static int binarySearch(int[] array, int target) {
    int result = Arrays.binarySearch(array, target);
    return result >= 0 ? result : -1;
}
```

</details>

## Step-by-Step Trace

Finding 9 in [1, 3, 5, 7, 9, 11, 13]:

| Step | left | right | mid | array[mid] | Action |
|------|------|-------|-----|------------|--------|
| 1    | 0    | 6     | 3   | 7          | 9 > 7, search right |
| 2    | 4    | 6     | 5   | 11         | 9 < 11, search left |
| 3    | 4    | 4     | 4   | 9          | Found at index 4! |

## Complexity Analysis

| Metric | Linear Search | Binary Search |
|--------|---------------|---------------|
| Time Complexity | O(n) | O(log n) |
| Space Complexity | O(1) | O(1) iterative, O(log n) recursive |

**Why O(log n)?**
- Each comparison eliminates half the remaining elements
- For n elements: log₂(n) comparisons needed
- 1,000,000 elements → ~20 comparisons

## Common Mistakes

### 1. Wrong Middle Calculation
```java
// Risk of integer overflow for large arrays
int mid = (left + right) / 2;

// Correct - no overflow
int mid = left + (right - left) / 2;
```

### 2. Infinite Loop
```java
// Wrong - causes infinite loop
if (array[mid] < target) {
    left = mid;      // Should be mid + 1
}

// Correct
left = mid + 1;
```

### 3. Wrong Loop Condition
```java
// Wrong - misses last element
while (left < right)

// Correct
while (left <= right)
```

## Extension Challenges

### 1. First Occurrence
Find the index of the first occurrence of target:
```java
firstOccurrence(new int[]{1, 2, 2, 2, 3}, 2)  // 1
```

### 2. Last Occurrence
Find the index of the last occurrence of target:
```java
lastOccurrence(new int[]{1, 2, 2, 2, 3}, 2)  // 3
```

### 3. Count Occurrences
Count how many times target appears:
```java
countOccurrences(new int[]{1, 2, 2, 2, 3}, 2)  // 3
```

### 4. Search Insert Position
Find where to insert target to keep array sorted:
```java
searchInsert(new int[]{1, 3, 5, 6}, 5)  // 2
searchInsert(new int[]{1, 3, 5, 6}, 2)  // 1
searchInsert(new int[]{1, 3, 5, 6}, 7)  // 4
```

### 5. Search in Rotated Array
Binary search in a sorted array that has been rotated:
```java
// [4, 5, 6, 7, 0, 1, 2] was [0, 1, 2, 4, 5, 6, 7] rotated
searchRotated(new int[]{4, 5, 6, 7, 0, 1, 2}, 0)  // 4
```

### 6. Peak Element
Find a peak element (greater than its neighbours):
```java
findPeak(new int[]{1, 2, 3, 1})  // 2 (index of 3)
```

## What You've Learned

After completing this challenge, you should understand:
- ✅ The binary search algorithm and why it's efficient
- ✅ How to calculate the middle index safely
- ✅ Setting and updating search boundaries
- ✅ The difference between iterative and recursive solutions
- ✅ Why sorted input is required for binary search

## Related Concepts

This challenge introduces you to:
- **Divide and conquer**: Breaking problems into smaller parts
- **Logarithmic complexity**: Understanding O(log n)
- **Search algorithms**: Comparing binary vs linear search
- **Recursion**: Alternative implementation approach

## Real-World Applications

Binary search is used in:
- Database indexing
- Finding words in a dictionary
- Git bisect (finding bug-introducing commits)
- System libraries (Arrays.binarySearch, Collections.binarySearch)

## Next Challenge

Try the **REST API Design** challenge to apply your skills to a real-world scenario!
