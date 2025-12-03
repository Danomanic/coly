---
sidebar_position: 5
---

# Data Types

Learn about the different types of data you can store and work with in Java.

## What are Data Types?

A **data type** specifies what kind of value a variable can hold. Java is a **strongly typed** language, meaning every variable must have a specific type.

Think of data types as categories: just like you wouldn't put liquid in a paper bag, you can't put text in a number variable.

## Primitive Data Types

Java has 8 primitive (built-in) data types:

### 1. Integer Types (Whole Numbers)

#### `byte`
- **Range**: -128 to 127
- **Size**: 8 bits
- **Use**: Saving memory when you know values are small

```java
byte age = 25;
byte temperature = -5;
```

#### `short`
- **Range**: -32,768 to 32,767
- **Size**: 16 bits
- **Use**: Small numbers, saving memory

```java
short year = 2024;
short altitude = -50;
```

#### `int`
- **Range**: -2,147,483,648 to 2,147,483,647
- **Size**: 32 bits
- **Use**: Default choice for whole numbers

```java
int population = 8000000;
int score = 100;
```

#### `long`
- **Range**: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
- **Size**: 64 bits
- **Use**: Very large numbers

```java
long distanceToSun = 149600000000L; // Note the 'L' suffix
long nationalDebt = 28000000000000L;
```

### 2. Floating-Point Types (Decimal Numbers)

#### `float`
- **Precision**: ~6-7 decimal digits
- **Size**: 32 bits
- **Use**: Decimal numbers when memory is limited

```java
float price = 19.99f; // Note the 'f' suffix
float percentage = 0.15f;
```

#### `double`
- **Precision**: ~15 decimal digits
- **Size**: 64 bits
- **Use**: Default choice for decimal numbers

```java
double pi = 3.14159265359;
double salary = 45000.75;
```

### 3. Character Type

#### `char`
- **Range**: Single character (0 to 65,535)
- **Size**: 16 bits
- **Use**: Storing a single letter, digit, or symbol

```java
char grade = 'A';
char initial = 'J';
char symbol = '@';
```

:::note
Use single quotes `'` for char, not double quotes `"`
:::

### 4. Boolean Type

#### `boolean`
- **Values**: `true` or `false` only
- **Size**: Not precisely defined (usually 1 bit)
- **Use**: Yes/no, on/off, true/false values

```java
boolean isStudent = true;
boolean hasLicence = false;
boolean isRaining = true;
```

## Reference Types

### String

While not a primitive type, `String` is the most commonly used reference type for storing text:

```java
String name = "Alice";
String message = "Hello, World!";
String empty = "";
```

:::note
Use double quotes `"` for String, not single quotes `'`
:::

## Type Comparison

| Type | Size | Range | Example |
|------|------|-------|---------|
| `byte` | 8 bits | -128 to 127 | `byte age = 25;` |
| `short` | 16 bits | -32,768 to 32,767 | `short year = 2024;` |
| `int` | 32 bits | -2.1B to 2.1B | `int population = 8000000;` |
| `long` | 64 bits | -9.2Q to 9.2Q | `long distance = 150000000L;` |
| `float` | 32 bits | ~7 digits | `float price = 19.99f;` |
| `double` | 64 bits | ~15 digits | `double pi = 3.14159;` |
| `char` | 16 bits | Single character | `char grade = 'A';` |
| `boolean` | ~ 1 bit | true/false | `boolean isValid = true;` |

## Default Values

If you don't initialise a variable, Java gives it a default value:

```java
int number;        // Default: 0
double decimal;    // Default: 0.0
boolean flag;      // Default: false
char letter;       // Default: '\u0000' (null character)
String text;       // Default: null
```

:::tip
Always initialise your variables explicitly to avoid confusion!
:::

## Type Casting

### Automatic Casting (Widening)

Java automatically converts smaller types to larger types:

```java
int myInt = 100;
double myDouble = myInt; // Automatic casting: int to double
System.out.println(myDouble); // 100.0
```

Order: `byte` → `short` → `int` → `long` → `float` → `double`

### Manual Casting (Narrowing)

Converting larger types to smaller types requires explicit casting:

```java
double myDouble = 9.78;
int myInt = (int) myDouble; // Manual casting: double to int
System.out.println(myInt); // 9 (decimal part is lost)
```

:::warning
Be careful with narrowing - you may lose data!
:::

## Choosing the Right Type

### For Whole Numbers
```java
int age = 25;              // Default choice
long population = 8000000000L; // Very large numbers
byte days = 7;             // Small numbers
```

### For Decimal Numbers
```java
double price = 19.99;      // Default choice (more precise)
float discount = 0.15f;    // When memory matters
```

### For Text
```java
String name = "Alice";     // Multiple characters
char initial = 'A';        // Single character
```

### For True/False
```java
boolean isActive = true;   // Only choice for boolean values
```

## Common Mistakes

### 1. Mixing Types Without Casting

```java
// Wrong
int x = 9.5; // Error: can't put double in int

// Correct
double x = 9.5;
// Or
int x = (int) 9.5; // x = 9
```

### 2. Forgetting Suffixes

```java
// Wrong
long bigNumber = 10000000000; // Error: too large for int

// Correct
long bigNumber = 10000000000L; // L suffix for long
```

```java
// Wrong
float price = 19.99; // Error: 19.99 is a double by default

// Correct
float price = 19.99f; // f suffix for float
```

### 3. Using Single Quotes for Strings

```java
// Wrong
String name = 'Alice'; // Error: use double quotes

// Correct
String name = "Alice";
char initial = 'A'; // Single quotes for char
```

## Practice Exercise

Create a program that declares variables of each type and prints them:

```java
public class DataTypesPractice {
    public static void main(String[] args) {
        // Declare one variable of each primitive type
        byte myByte = 100;
        short myShort = 5000;
        // ... add the rest

        // Print them all with labels
        System.out.println("Byte: " + myByte);
        System.out.println("Short: " + myShort);
        // ... add the rest

        // Try some type casting
        double myDouble = 9.78;
        int myInt = (int) myDouble;
        System.out.println("Double: " + myDouble);
        System.out.println("Converted to Int: " + myInt);
    }
}
```

### Challenges

1. What happens when you add an `int` and a `double`? What type is the result?
2. Try storing 128 in a `byte` variable. What happens?
3. What's the difference between `'5'` and `5`?

## Key Takeaways

- Java has 8 primitive types: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`
- Use `int` for whole numbers and `double` for decimals by default
- `String` is a reference type for storing text
- Casting converts between types (automatic for widening, manual for narrowing)
- Choose types based on the range and precision you need

## Next Steps

Now that you understand data types, let's learn about operators to perform calculations and comparisons with these values.
