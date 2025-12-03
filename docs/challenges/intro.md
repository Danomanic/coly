---
displayed_sidebar: challengesSidebar
sidebar_position: 1
slug: /challenges
---

# Coding Challenges

Welcome to the COLY Challenges section! Here you'll find coding exercises, katas, and problems to test and improve your programming skills.

## What are Coding Challenges?

Coding challenges are small, focused problems designed to help you:
- **Practice** what you've learnt in the courses
- **Strengthen** your problem-solving skills
- **Build** confidence in writing code
- **Prepare** for technical interviews
- **Have fun** whilst learning!

## How to Use These Challenges

### 1. Choose Your Level

Start with challenges that match your current skill level:
- **Beginner**: Basic syntax, variables, loops, and conditions
- **Intermediate**: Functions, arrays, and more complex logic
- **Advanced**: Algorithms, data structures, and optimisation

### 2. Try It Yourself First

Before looking at the solution:
1. Read the problem carefully
2. Think about the approach
3. Write your code
4. Test with the provided examples
5. Debug any issues

### 3. Learn from Solutions

After attempting the challenge:
- Compare your solution with the provided one
- Understand different approaches
- Learn better coding practices
- Optimise your solution

## Challenge Categories

### Beginner Challenges
- Basic calculations and string manipulation
- Simple loops and conditions
- Input validation
- Pattern printing

### Intermediate Challenges
- Working with arrays
- String algorithms
- Number theory problems
- Searching and sorting

### Advanced Challenges
- Complex algorithms
- Data structures
- Performance optimisation
- Real-world problem solving

## Tips for Success

### Before You Start

1. **Understand the Problem**: Read it multiple times if needed
2. **Plan Your Approach**: Think before you code
3. **Consider Edge Cases**: What could go wrong?
4. **Start Simple**: Get something working first

### Whilst Coding

1. **Use Meaningful Names**: Make your code readable
2. **Test Frequently**: Don't wait until the end
3. **Break It Down**: Split complex problems into smaller parts
4. **Comment When Needed**: Explain tricky parts

### After Solving

1. **Review Your Code**: Can it be improved?
2. **Test Edge Cases**: Try unusual inputs
3. **Optimise**: Can you make it faster or cleaner?
4. **Learn**: What did this challenge teach you?

## Testing Your Solutions

### Create a Test File

```java
public class ChallengeTest {
    public static void main(String[] args) {
        // Test case 1
        int result1 = yourFunction(input1);
        System.out.println("Test 1: " + (result1 == expected1 ? "PASS" : "FAIL"));

        // Test case 2
        int result2 = yourFunction(input2);
        System.out.println("Test 2: " + (result2 == expected2 ? "PASS" : "FAIL"));

        // Add more test cases...
    }
}
```

### Test Different Scenarios

- **Normal cases**: Typical expected inputs
- **Edge cases**: Minimum, maximum, boundary values
- **Invalid inputs**: Negative numbers, empty strings, null values
- **Special cases**: Zero, one, very large numbers

## Common Mistakes to Avoid

### 1. Not Reading Carefully
```java
// Problem: Return the sum of all EVEN numbers from 1 to n
// Wrong - includes odd numbers
for (int i = 1; i <= n; i++) {
    sum += i;
}

// Correct
for (int i = 2; i <= n; i += 2) {
    sum += i;
}
```

### 2. Off-by-One Errors
```java
// Wrong - misses last element
for (int i = 0; i < array.length - 1; i++) {
    // ...
}

// Correct
for (int i = 0; i < array.length; i++) {
    // ...
}
```

### 3. Not Considering Edge Cases
```java
// What if the array is empty?
// What if the number is negative?
// What if the string is null?

// Always validate inputs!
if (array == null || array.length == 0) {
    return 0;  // or throw an exception
}
```

## Getting Stuck?

If you're struggling with a challenge:

1. **Break It Down**: Solve smaller parts first
2. **Use Examples**: Work through the examples manually
3. **Draw It Out**: Visualise the problem
4. **Google Similar Problems**: Learn patterns (but don't copy solutions!)
5. **Ask for Help**: Discuss with others, but understand the solution

## Practice Makes Perfect

The key to becoming a better programmer is **consistent practice**. Try to:
- Solve at least one challenge per day
- Revisit old challenges and improve your solutions
- Challenge yourself with harder problems
- Explain your solutions to others

## Ready to Start?

Browse the challenges below and pick one that interests you. Remember, it's not about getting it right immediately—it's about learning and improving with each attempt.

Good luck, and happy coding! 🚀

## External Resources

Want more practice? Check out these platforms:
- [LeetCode](https://leetcode.com/) - Technical interview preparation
- [HackerRank](https://www.hackerrank.com/) - Practice by topic
- [Codewars](https://www.codewars.com/) - Kata-style challenges
- [Project Euler](https://projecteuler.net/) - Mathematical problems
