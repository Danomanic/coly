---
sidebar_position: 8
---

# Loops

Learn how to repeat actions in your code efficiently using loops.

## What are Loops?

**Loops** allow you to execute the same block of code multiple times without writing it repeatedly. They're essential for processing collections of data and automating repetitive tasks.

Instead of writing:
```java
System.out.println("Hello");
System.out.println("Hello");
System.out.println("Hello");
System.out.println("Hello");
System.out.println("Hello");
```

You can write:
```java
for (int i = 0; i < 5; i++) {
    System.out.println("Hello");
}
```

## The `for` Loop

Best used when you know how many times you want to repeat something.

### Syntax

```java
for (initialisation; condition; update) {
    // Code to repeat
}
```

### Example

```java
for (int i = 0; i < 5; i++) {
    System.out.println("Iteration: " + i);
}

// Output:
// Iteration: 0
// Iteration: 1
// Iteration: 2
// Iteration: 3
// Iteration: 4
```

### How it Works

1. **Initialisation**: `int i = 0` - Create and initialise the counter
2. **Condition**: `i < 5` - Check if loop should continue
3. **Code Block**: Execute the code inside `{}`
4. **Update**: `i++` - Increment the counter
5. **Repeat** steps 2-4 until condition is false

### More Examples

```java
// Count from 1 to 10
for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}

// Count backwards
for (int i = 10; i > 0; i--) {
    System.out.println(i);
}

// Count by 2s
for (int i = 0; i <= 20; i += 2) {
    System.out.println(i);  // 0, 2, 4, 6, ..., 20
}

// Multiply by 2 each time
for (int i = 1; i <= 100; i *= 2) {
    System.out.println(i);  // 1, 2, 4, 8, 16, 32, 64
}
```

### Practical Examples

#### Calculate Sum

```java
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
System.out.println("Sum of 1 to 100: " + sum);  // 5050
```

#### Times Table

```java
int number = 7;
for (int i = 1; i <= 10; i++) {
    System.out.println(number + " x " + i + " = " + (number * i));
}
```

## The `while` Loop

Best used when you don't know how many iterations you'll need.

### Syntax

```java
while (condition) {
    // Code to repeat
}
```

### Example

```java
int count = 0;

while (count < 5) {
    System.out.println("Count: " + count);
    count++;
}

// Output:
// Count: 0
// Count: 1
// Count: 2
// Count: 3
// Count: 4
```

### How it Works

1. **Check Condition**: Is it true?
2. **Execute Code**: If true, run the code block
3. **Repeat**: Go back to step 1
4. **Exit**: When condition becomes false

### More Examples

```java
// Countdown
int countdown = 10;
while (countdown > 0) {
    System.out.println(countdown);
    countdown--;
}
System.out.println("Blast off!");

// Find first power of 2 greater than 1000
int power = 1;
while (power <= 1000) {
    power *= 2;
}
System.out.println("First power of 2 > 1000: " + power);
```

### Practical Example: User Input

```java
Scanner scanner = new Scanner(System.in);
String input = "";

while (!input.equals("exit")) {
    System.out.print("Enter command (or 'exit' to quit): ");
    input = scanner.nextLine();
    System.out.println("You entered: " + input);
}
```

## The `do-while` Loop

Similar to `while`, but always executes at least once.

### Syntax

```java
do {
    // Code to repeat
} while (condition);
```

### Example

```java
int count = 0;

do {
    System.out.println("Count: " + count);
    count++;
} while (count < 5);
```

### `while` vs `do-while`

```java
// while - may not execute at all
int x = 10;
while (x < 5) {
    System.out.println("This won't print");
}

// do-while - always executes at least once
int y = 10;
do {
    System.out.println("This prints once");  // Executes!
} while (y < 5);
```

### Practical Example: Input Validation

```java
Scanner scanner = new Scanner(System.in);
int age;

do {
    System.out.print("Enter your age (1-120): ");
    age = scanner.nextInt();
} while (age < 1 || age > 120);

System.out.println("Valid age entered: " + age);
```

## Enhanced `for` Loop (For-Each)

Best for iterating through arrays and collections.

### Syntax

```java
for (type variable : collection) {
    // Use variable
}
```

### Example

```java
String[] names = {"Alice", "Bob", "Charlie"};

for (String name : names) {
    System.out.println("Hello, " + name);
}

// Output:
// Hello, Alice
// Hello, Bob
// Hello, Charlie
```

### More Examples

```java
// Array of numbers
int[] numbers = {1, 2, 3, 4, 5};
int sum = 0;

for (int num : numbers) {
    sum += num;
}
System.out.println("Sum: " + sum);  // 15

// Finding maximum
int[] scores = {85, 92, 78, 95, 88};
int max = scores[0];

for (int score : scores) {
    if (score > max) {
        max = score;
    }
}
System.out.println("Highest score: " + max);  // 95
```

## Nested Loops

Loops inside other loops:

```java
// Multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        System.out.print(i * j + "\t");
    }
    System.out.println();
}

// Output:
// 1  2  3  4  5
// 2  4  6  8  10
// 3  6  9  12 15
// 4  8  12 16 20
// 5  10 15 20 25
```

### Pattern Printing

```java
// Print a triangle
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}

// Output:
// *
// * *
// * * *
// * * * *
// * * * * *
```

## Loop Control Statements

### `break` - Exit the Loop

```java
// Find first number divisible by 7 and 13
for (int i = 1; i <= 1000; i++) {
    if (i % 7 == 0 && i % 13 == 0) {
        System.out.println("Found: " + i);
        break;  // Exit the loop
    }
}
// Output: Found: 91
```

### `continue` - Skip to Next Iteration

```java
// Print only odd numbers
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }
    System.out.println(i);
}
// Output: 1, 3, 5, 7, 9
```

### Examples

```java
// Search for a name
String[] names = {"Alice", "Bob", "Charlie", "David"};
String searchName = "Charlie";
boolean found = false;

for (String name : names) {
    if (name.equals(searchName)) {
        System.out.println("Found: " + name);
        found = true;
        break;
    }
}

if (!found) {
    System.out.println("Name not found");
}
```

## Infinite Loops

Be careful - loops that never end!

```java
// Infinite loop - don't do this!
while (true) {
    System.out.println("This runs forever");
}

// Another infinite loop
for (int i = 0; i >= 0; i++) {
    System.out.println("This never stops");
}
```

:::warning
Always ensure your loop has a way to exit, or use `break` intentionally.
:::

### Intentional Infinite Loop

```java
// Game loop - exit when player chooses to quit
while (true) {
    String choice = getPlayerChoice();

    if (choice.equals("quit")) {
        break;  // Exit the loop
    }

    playGame();
}
```

## Choosing the Right Loop

| Loop Type | When to Use |
|-----------|-------------|
| `for` | You know how many iterations needed |
| `while` | You don't know iteration count, may not execute at all |
| `do-while` | Same as while, but must execute at least once |
| `for-each` | Iterating through arrays or collections |

## Common Mistakes

### 1. Off-By-One Errors

```java
// Wrong - runs 11 times (0-10)
for (int i = 0; i <= 10; i++) {
    System.out.println(i);
}

// Correct - runs 10 times (0-9)
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

### 2. Forgetting to Update Counter

```java
// Infinite loop - i never changes!
int i = 0;
while (i < 5) {
    System.out.println(i);
    // Missing: i++
}

// Correct
int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}
```

### 3. Modifying Loop Variable

```java
// Confusing - avoid modifying i inside the loop
for (int i = 0; i < 10; i++) {
    System.out.println(i);
    i += 2;  // Don't do this!
}
```

## Practice Exercises

### 1. Sum Calculator
Calculate the sum of all numbers from 1 to 100.

### 2. Factorial
Calculate the factorial of a number (e.g., 5! = 5 × 4 × 3 × 2 × 1 = 120).

### 3. Fizz Buzz
Print numbers 1 to 100, but:
- Print "Fizz" for multiples of 3
- Print "Buzz" for multiples of 5
- Print "FizzBuzz" for multiples of both

### 4. Pattern Printing
Print this pattern:
```
*****
****
***
**
*
```

### 5. Prime Number Checker
Check if a number is prime (only divisible by 1 and itself).

### Solution Template

```java
public class LoopsPractice {
    public static void main(String[] args) {
        // 1. Sum Calculator
        int sum = 0;
        // Your code here

        // 2. Factorial
        int n = 5;
        int factorial = 1;
        // Your code here

        // 3. FizzBuzz
        // Your code here

        // 4. Pattern
        // Your code here

        // 5. Prime Checker
        int number = 17;
        boolean isPrime = true;
        // Your code here
    }
}
```

## Key Takeaways

- Use `for` loops when you know the iteration count
- Use `while` loops when the iteration count depends on a condition
- Use `do-while` when code must execute at least once
- Use for-each loops for arrays and collections
- `break` exits the loop completely
- `continue` skips to the next iteration
- Beware of infinite loops and off-by-one errors

## Next Steps

Now that you can repeat actions with loops, let's learn about functions - how to organise your code into reusable blocks.
