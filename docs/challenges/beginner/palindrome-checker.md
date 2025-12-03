---
sidebar_position: 2
---

# Palindrome Checker

Check if a word or phrase reads the same forwards and backwards.

## Difficulty
⭐ Beginner

## Problem Description

Write a program that checks whether a given string is a palindrome. A palindrome is a word, phrase, or sequence that reads the same backwards as forwards.

**Examples of palindromes:**
- "racecar"
- "madam"
- "noon"
- "level"

**Not palindromes:**
- "hello"
- "world"
- "java"

## Example Output

```
Input: "racecar"
Output: true

Input: "hello"
Output: false

Input: "noon"
Output: true
```

## Skills Practised

- String manipulation
- Loops
- Conditional statements
- String methods (`.length()`, `.charAt()`)

## Requirements

1. Create a method `isPalindrome(String text)` that returns `boolean`
2. The method should return `true` if the text is a palindrome, `false` otherwise
3. For now, assume input is all lowercase with no spaces or punctuation

## Test Cases

```java
isPalindrome("racecar")  // should return true
isPalindrome("hello")    // should return false
isPalindrome("noon")     // should return true
isPalindrome("level")    // should return true
isPalindrome("java")     // should return false
isPalindrome("a")        // should return true
isPalindrome("")         // should return true
```

## Hints

<details>
<summary>Hint 1: Reverse the string</summary>

One approach is to reverse the string and compare it with the original:
```java
String reversed = "";
for (int i = text.length() - 1; i >= 0; i--) {
    reversed += text.charAt(i);
}
return text.equals(reversed);
```
</details>

<details>
<summary>Hint 2: Compare characters</summary>

Another approach is to compare characters from both ends:
```java
for (int i = 0; i < text.length() / 2; i++) {
    if (text.charAt(i) != text.charAt(text.length() - 1 - i)) {
        return false;
    }
}
return true;
```
</details>

<details>
<summary>Hint 3: Two pointers</summary>

Use two pointers, one at the start and one at the end:
```java
int left = 0;
int right = text.length() - 1;

while (left < right) {
    if (text.charAt(left) != text.charAt(right)) {
        return false;
    }
    left++;
    right--;
}
return true;
```
</details>

## Starter Code

```java
public class PalindromeChecker {
    public static void main(String[] args) {
        // Test your method
        System.out.println(isPalindrome("racecar"));  // true
        System.out.println(isPalindrome("hello"));    // false
        System.out.println(isPalindrome("noon"));     // true
    }

    public static boolean isPalindrome(String text) {
        // Write your code here
        return false;
    }
}
```

## Solution

<details>
<summary>Click to reveal solution</summary>

**Solution 1: Reverse and Compare**

```java
public class PalindromeChecker {
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));  // true
        System.out.println(isPalindrome("hello"));    // false
        System.out.println(isPalindrome("noon"));     // true
    }

    public static boolean isPalindrome(String text) {
        String reversed = "";

        for (int i = text.length() - 1; i >= 0; i--) {
            reversed += text.charAt(i);
        }

        return text.equals(reversed);
    }
}
```

**Solution 2: Two Pointers (More Efficient)**

```java
public class PalindromeChecker {
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));  // true
        System.out.println(isPalindrome("hello"));    // false
        System.out.println(isPalindrome("noon"));     // true
    }

    public static boolean isPalindrome(String text) {
        int left = 0;
        int right = text.length() - 1;

        while (left < right) {
            if (text.charAt(left) != text.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
}
```

**Solution 3: Compare First and Second Half**

```java
public class PalindromeChecker {
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));  // true
        System.out.println(isPalindrome("hello"));    // false
        System.out.println(isPalindrome("noon"));     // true
    }

    public static boolean isPalindrome(String text) {
        for (int i = 0; i < text.length() / 2; i++) {
            if (text.charAt(i) != text.charAt(text.length() - 1 - i)) {
                return false;
            }
        }
        return true;
    }
}
```

</details>

## Extension Challenges

### 1. Case Insensitive
Modify your solution to handle uppercase and lowercase:
```java
isPalindrome("Racecar")  // should return true
isPalindrome("Level")    // should return true
```

<details>
<summary>Hint</summary>

Convert the string to lowercase first:
```java
text = text.toLowerCase();
```
</details>

### 2. Ignore Spaces
Handle phrases with spaces:
```java
isPalindrome("race car")  // should return true
isPalindrome("nurses run") // should return true
```

<details>
<summary>Hint</summary>

Remove spaces first:
```java
text = text.replace(" ", "");
```
</details>

### 3. Full Phrase Palindrome
Handle complete phrases with spaces, punctuation, and mixed case:
```java
isPalindrome("A man, a plan, a canal: Panama")  // should return true
isPalindrome("Was it a car or a cat I saw?")     // should return true
```

<details>
<summary>Hint</summary>

Keep only letters and numbers, and convert to lowercase:
```java
text = text.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
```
</details>

### 4. Palindrome Number
Create a method that checks if a number is a palindrome:
```java
isPalindromeNumber(121)    // should return true
isPalindromeNumber(123)    // should return false
isPalindromeNumber(12321)  // should return true
```

## What You've Learned

After completing this challenge, you should understand:
- ✅ How to access individual characters in a string
- ✅ How to loop through a string
- ✅ How to compare characters
- ✅ Different approaches to solving the same problem
- ✅ The concept of "two pointers" technique

## Related Concepts

This challenge introduces you to:
- **String manipulation**: Working with text data
- **Algorithm efficiency**: Some solutions are faster than others
- **Edge cases**: Empty strings, single characters

## Next Challenge

Try the **Sum of Digits** challenge to practise working with numbers and loops!
