---
sidebar_position: 2
---

# Merge Sort Implementation

Implement merge sort - a fundamental divide-and-conquer sorting algorithm.

## Difficulty
⭐⭐⭐ Advanced

## Problem Description

Implement the merge sort algorithm to sort an array of integers in ascending order. Merge sort is an efficient, stable sorting algorithm that uses the divide-and-conquer strategy.

**How Merge Sort Works:**
1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge the sorted halves back together

## Example Output

```
Input: [38, 27, 43, 3, 9, 82, 10]
Output: [3, 9, 10, 27, 38, 43, 82]

Input: [5, 2, 8, 1, 9]
Output: [1, 2, 5, 8, 9]

Input: [1]
Output: [1]
```

## Skills Practised

- Recursion
- Divide and conquer algorithms
- Array manipulation
- Algorithm complexity analysis
- Understanding stable sorting

## Requirements

1. Create a method `mergeSort(int[] array)` that sorts in place or returns a sorted array
2. Implement the merge operation correctly
3. Handle edge cases (empty array, single element)

## Test Cases

```java
mergeSort(new int[]{38, 27, 43, 3, 9, 82, 10})  // [3, 9, 10, 27, 38, 43, 82]
mergeSort(new int[]{5, 2, 8, 1, 9})              // [1, 2, 5, 8, 9]
mergeSort(new int[]{1, 2, 3, 4, 5})              // [1, 2, 3, 4, 5] (already sorted)
mergeSort(new int[]{5, 4, 3, 2, 1})              // [1, 2, 3, 4, 5] (reverse sorted)
mergeSort(new int[]{1})                          // [1]
mergeSort(new int[]{})                           // []
mergeSort(new int[]{3, 3, 3, 3})                 // [3, 3, 3, 3] (duplicates)
```

## Visual Representation

```
Original: [38, 27, 43, 3, 9, 82, 10]

DIVIDE PHASE:
                    [38, 27, 43, 3, 9, 82, 10]
                   /                          \
          [38, 27, 43, 3]                [9, 82, 10]
          /            \                  /        \
      [38, 27]      [43, 3]          [9, 82]     [10]
      /     \       /     \          /     \
   [38]   [27]   [43]   [3]       [9]    [82]

MERGE PHASE:
   [38]   [27]   [43]   [3]       [9]    [82]    [10]
      \     /       \     /          \     /
      [27, 38]      [3, 43]          [9, 82]     [10]
          \            /                  \        /
          [3, 27, 38, 43]                [9, 10, 82]
                   \                          /
                    [3, 9, 10, 27, 38, 43, 82]
```

## Hints

<details>
<summary>Hint 1: Base case</summary>

Recursion stops when the array has 0 or 1 elements:
```java
if (array.length <= 1) {
    return array;
}
```
</details>

<details>
<summary>Hint 2: Splitting the array</summary>

Find the middle and create two subarrays:
```java
int mid = array.length / 2;
int[] left = Arrays.copyOfRange(array, 0, mid);
int[] right = Arrays.copyOfRange(array, mid, array.length);
```
</details>

<details>
<summary>Hint 3: The merge operation</summary>

Merge two sorted arrays by comparing elements:
```java
int i = 0, j = 0, k = 0;
while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
        result[k++] = left[i++];
    } else {
        result[k++] = right[j++];
    }
}
// Copy remaining elements
```
</details>

<details>
<summary>Hint 4: Recursive structure</summary>

```java
public static int[] mergeSort(int[] array) {
    // Base case
    if (array.length <= 1) return array;

    // Divide
    int mid = array.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(array, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(array, mid, array.length));

    // Conquer (merge)
    return merge(left, right);
}
```
</details>

## Starter Code

```java
import java.util.Arrays;

public class MergeSort {
    public static void main(String[] args) {
        int[] array = {38, 27, 43, 3, 9, 82, 10};
        int[] sorted = mergeSort(array);
        System.out.println(Arrays.toString(sorted));
        // Expected: [3, 9, 10, 27, 38, 43, 82]
    }

    public static int[] mergeSort(int[] array) {
        // Write your code here
        return array;
    }

    private static int[] merge(int[] left, int[] right) {
        // Write your code here
        return new int[0];
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

**Solution 1: Returning New Array**

```java
import java.util.Arrays;

public class MergeSort {
    public static void main(String[] args) {
        int[] array = {38, 27, 43, 3, 9, 82, 10};
        int[] sorted = mergeSort(array);
        System.out.println(Arrays.toString(sorted));
    }

    public static int[] mergeSort(int[] array) {
        // Base case: already sorted
        if (array.length <= 1) {
            return array;
        }

        // Divide
        int mid = array.length / 2;
        int[] left = Arrays.copyOfRange(array, 0, mid);
        int[] right = Arrays.copyOfRange(array, mid, array.length);

        // Recursively sort both halves
        left = mergeSort(left);
        right = mergeSort(right);

        // Merge sorted halves
        return merge(left, right);
    }

    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0, j = 0, k = 0;

        // Compare and merge
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }

        // Copy remaining elements from left
        while (i < left.length) {
            result[k++] = left[i++];
        }

        // Copy remaining elements from right
        while (j < right.length) {
            result[k++] = right[j++];
        }

        return result;
    }
}
```

**Solution 2: In-Place (More Memory Efficient)**

```java
public class MergeSort {
    public static void main(String[] args) {
        int[] array = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(array, 0, array.length - 1);
        System.out.println(Arrays.toString(array));
    }

    public static void mergeSort(int[] array, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSort(array, left, mid);
            mergeSort(array, mid + 1, right);

            // Merge the sorted halves
            merge(array, left, mid, right);
        }
    }

    private static void merge(int[] array, int left, int mid, int right) {
        // Create temp arrays
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];

        // Copy data to temp arrays
        for (int i = 0; i < n1; i++) {
            leftArray[i] = array[left + i];
        }
        for (int j = 0; j < n2; j++) {
            rightArray[j] = array[mid + 1 + j];
        }

        // Merge temp arrays back
        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                array[k++] = leftArray[i++];
            } else {
                array[k++] = rightArray[j++];
            }
        }

        // Copy remaining elements
        while (i < n1) {
            array[k++] = leftArray[i++];
        }
        while (j < n2) {
            array[k++] = rightArray[j++];
        }
    }
}
```

</details>

## Complexity Analysis

| Metric | Complexity | Explanation |
|--------|------------|-------------|
| Time (Best) | O(n log n) | Always divides and merges |
| Time (Average) | O(n log n) | Consistent performance |
| Time (Worst) | O(n log n) | No degradation |
| Space | O(n) | Needs auxiliary array for merging |

**Why O(n log n)?**
- log n levels of division
- n comparisons at each level
- Total: n × log n

## Comparison with Other Sorts

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |

## Common Mistakes

### 1. Incorrect Mid Calculation
```java
// Risk of overflow for large arrays
int mid = (left + right) / 2;

// Correct
int mid = left + (right - left) / 2;
```

### 2. Not Copying Remaining Elements
```java
// Wrong - forgets remaining elements
while (i < left.length && j < right.length) {
    // merge logic
}
// Missing: copy remaining from left AND right
```

### 3. Wrong Array Indices
```java
// Off-by-one error
int[] left = Arrays.copyOfRange(array, 0, mid - 1);  // Wrong
int[] left = Arrays.copyOfRange(array, 0, mid);      // Correct
```

## Extension Challenges

### 1. Count Inversions
Count how many swaps bubble sort would need:
```java
countInversions(new int[]{2, 4, 1, 3, 5})  // 3
// Inversions: (2,1), (4,1), (4,3)
```

### 2. Merge K Sorted Arrays
Merge multiple sorted arrays efficiently:
```java
mergeKArrays(new int[][]{{1, 4, 7}, {2, 5, 8}, {3, 6, 9}})
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 3. External Sort
Sort data that doesn't fit in memory (simulate with file I/O).

### 4. Bottom-Up Merge Sort
Implement iterative merge sort without recursion.

### 5. Natural Merge Sort
Optimise for partially sorted data by finding natural runs.

### 6. Sort Linked List
Apply merge sort to a linked list:
```java
ListNode sortList(ListNode head)
```

## What You've Learned

After completing this challenge, you should understand:
- ✅ The divide-and-conquer paradigm
- ✅ How merge sort guarantees O(n log n)
- ✅ The merge operation for combining sorted arrays
- ✅ Trade-offs between time and space complexity
- ✅ What it means for a sort to be "stable"

## Related Concepts

This challenge introduces you to:
- **Divide and conquer**: Breaking problems into subproblems
- **Recursion**: The natural way to express this algorithm
- **Stability**: Preserving order of equal elements
- **Algorithm analysis**: Understanding complexity guarantees

## Real-World Applications

Merge sort is used in:
- External sorting (sorting files larger than memory)
- Stable sorting requirements
- Linked list sorting (where random access is expensive)
- Java's `Arrays.sort()` for objects (TimSort is merge-sort based)

## Next Challenge

Congratulations on mastering these advanced algorithms! Consider exploring more complex data structures like trees and graphs.
