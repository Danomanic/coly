---
sidebar_position: 2
---

# Anagram Checker

Determine if two strings are anagrams - a classic string manipulation problem.

## Difficulty
⭐⭐ Intermediate

## Problem Description

Write a program that checks whether two strings are anagrams of each other. An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.

**Examples of anagrams:**
- "listen" and "silent"
- "triangle" and "integral"
- "evil" and "vile"

**Not anagrams:**
- "hello" and "world" (different letters)
- "aab" and "bba" (different letter counts)

## Example Output

```
Input: "listen", "silent"
Output: true

Input: "hello", "world"
Output: false

Input: "triangle", "integral"
Output: true

Input: "aab", "aba"
Output: true
```

## Skills Practised

- String manipulation
- Arrays and sorting
- Character counting
- Multiple solution approaches

## Requirements

1. Create a method `areAnagrams(String str1, String str2)` that returns `boolean`
2. Return `true` if the strings are anagrams, `false` otherwise
3. The comparison should be case-insensitive
4. Ignore spaces in the comparison

## Test Cases

```java
areAnagrams("listen", "silent")       // true
areAnagrams("triangle", "integral")   // true
areAnagrams("hello", "world")         // false
areAnagrams("evil", "vile")           // true
areAnagrams("Dormitory", "Dirty room") // true (ignore spaces and case)
areAnagrams("aab", "bba")             // false
areAnagrams("", "")                   // true
areAnagrams("a", "a")                 // true
```

## Hints

<details>
<summary>Hint 1: Sorting approach</summary>

If you sort both strings alphabetically, anagrams will produce identical results:
```java
"listen" → "eilnst"
"silent" → "eilnst"
// Both produce the same sorted string!
```
</details>

<details>
<summary>Hint 2: Character counting approach</summary>

Count the frequency of each character. Anagrams have the same character counts:
```java
"listen": e=1, i=1, l=1, n=1, s=1, t=1
"silent": e=1, i=1, l=1, n=1, s=1, t=1
// Same counts!
```
</details>

<details>
<summary>Hint 3: Preprocessing</summary>

Before comparing, clean up both strings:
```java
str1 = str1.toLowerCase().replace(" ", "");
str2 = str2.toLowerCase().replace(" ", "");
```
</details>

<details>
<summary>Hint 4: Quick length check</summary>

Anagrams must have the same length (after removing spaces):
```java
if (str1.length() != str2.length()) {
    return false;
}
```
</details>

## Starter Code

```java
public class AnagramChecker {
    public static void main(String[] args) {
        // Test your method
        System.out.println(areAnagrams("listen", "silent"));       // true
        System.out.println(areAnagrams("hello", "world"));         // false
        System.out.println(areAnagrams("triangle", "integral"));   // true
    }

    public static boolean areAnagrams(String str1, String str2) {
        // Write your code here
        return false;
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

**Solution 1: Sorting Approach**

```java
import java.util.Arrays;

public class AnagramChecker {
    public static void main(String[] args) {
        System.out.println(areAnagrams("listen", "silent"));       // true
        System.out.println(areAnagrams("hello", "world"));         // false
        System.out.println(areAnagrams("Dormitory", "Dirty room")); // true
    }

    public static boolean areAnagrams(String str1, String str2) {
        // Preprocess: lowercase and remove spaces
        str1 = str1.toLowerCase().replace(" ", "");
        str2 = str2.toLowerCase().replace(" ", "");

        // Quick length check
        if (str1.length() != str2.length()) {
            return false;
        }

        // Sort both strings and compare
        char[] chars1 = str1.toCharArray();
        char[] chars2 = str2.toCharArray();

        Arrays.sort(chars1);
        Arrays.sort(chars2);

        return Arrays.equals(chars1, chars2);
    }
}
```

**Solution 2: Character Counting with Array**

```java
public class AnagramChecker {
    public static void main(String[] args) {
        System.out.println(areAnagrams("listen", "silent"));       // true
        System.out.println(areAnagrams("hello", "world"));         // false
    }

    public static boolean areAnagrams(String str1, String str2) {
        // Preprocess
        str1 = str1.toLowerCase().replace(" ", "");
        str2 = str2.toLowerCase().replace(" ", "");

        if (str1.length() != str2.length()) {
            return false;
        }

        // Count characters (assuming lowercase letters only)
        int[] charCount = new int[26];

        for (char c : str1.toCharArray()) {
            charCount[c - 'a']++;
        }

        for (char c : str2.toCharArray()) {
            charCount[c - 'a']--;
        }

        // Check all counts are zero
        for (int count : charCount) {
            if (count != 0) {
                return false;
            }
        }

        return true;
    }
}
```

**Solution 3: Using HashMap**

```java
import java.util.HashMap;
import java.util.Map;

public class AnagramChecker {
    public static void main(String[] args) {
        System.out.println(areAnagrams("listen", "silent"));       // true
        System.out.println(areAnagrams("hello", "world"));         // false
    }

    public static boolean areAnagrams(String str1, String str2) {
        str1 = str1.toLowerCase().replace(" ", "");
        str2 = str2.toLowerCase().replace(" ", "");

        if (str1.length() != str2.length()) {
            return false;
        }

        Map<Character, Integer> charCount = new HashMap<>();

        // Add counts from first string
        for (char c : str1.toCharArray()) {
            charCount.put(c, charCount.getOrDefault(c, 0) + 1);
        }

        // Subtract counts from second string
        for (char c : str2.toCharArray()) {
            int count = charCount.getOrDefault(c, 0) - 1;
            if (count < 0) {
                return false;
            }
            charCount.put(c, count);
        }

        return true;
    }
}
```

</details>

## How It Works

### Sorting Approach

| String | After Preprocessing | After Sorting |
|--------|---------------------|---------------|
| "listen" | "listen" | "eilnst" |
| "silent" | "silent" | "eilnst" |

Both produce "eilnst", so they're anagrams!

### Counting Approach

| Character | Count in "listen" | Count in "silent" | Difference |
|-----------|-------------------|-------------------|------------|
| e | 1 | 1 | 0 |
| i | 1 | 1 | 0 |
| l | 1 | 1 | 0 |
| n | 1 | 1 | 0 |
| s | 1 | 1 | 0 |
| t | 1 | 1 | 0 |

All differences are 0, so they're anagrams!

## Complexity Analysis

| Approach | Time Complexity | Space Complexity |
|----------|-----------------|------------------|
| Sorting | O(n log n) | O(n) |
| Counting (Array) | O(n) | O(1) - fixed 26 chars |
| Counting (HashMap) | O(n) | O(n) |

## Extension Challenges

### 1. Group Anagrams
Given a list of strings, group anagrams together:
```java
groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
// [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

### 2. Find All Anagrams in String
Find all starting indices of anagrams of pattern in text:
```java
findAnagrams("cbaebabacd", "abc")  // [0, 6]
// "cba" at index 0 and "bac" at index 6 are anagrams of "abc"
```

### 3. Valid Anagram with Unicode
Handle strings with Unicode characters:
```java
areAnagrams("cafe", "face")     // true
areAnagrams("naïve", "avien")   // Handle accented characters
```

### 4. Minimum Swaps for Anagram
Find minimum swaps to make two strings anagrams:
```java
minSwaps("abcd", "dcba")  // 2
```

### 5. Anagram Sentence
Check if two sentences are anagrams (ignoring word order):
```java
areAnagramSentences("rail safety", "fairy tales")  // true
```

## What You've Learned

After completing this challenge, you should understand:
- ✅ Multiple approaches to solving the same problem
- ✅ How to use sorting for comparison
- ✅ Character frequency counting techniques
- ✅ Trade-offs between different solutions
- ✅ String preprocessing (case conversion, removing spaces)

## Related Concepts

This challenge introduces you to:
- **Sorting algorithms**: Used in the sorting approach
- **Hash maps**: Efficient character counting
- **Character encoding**: Understanding ASCII values
- **Algorithm complexity**: Comparing solution efficiency

## Next Challenge

Try the **Binary Search** challenge to practise efficient searching algorithms!
