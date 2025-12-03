---
sidebar_position: 3
---

# Your First Java Program

Now that your environment is set up, let's write and run your first Java program!

## Create HelloColy.java

Create a new file called `HelloColy.java` and add the following code:

```java
public class HelloColy {
    public static void main(String[] args) {
        System.out.println("Hello, COLY!");
    }
}
```

## Understanding the Code

Let's break down what each part means:

- `public class HelloColy`: Declares a class named HelloColy
- `public static void main(String[] args)`: The entry point of every Java program
- `System.out.println()`: Prints text to the console

## Compile and Run

Open your terminal in the directory where you saved the file and run:

```bash
javac HelloColy.java
```

This compiles your Java code into bytecode. You should now see a `HelloColy.class` file.

Now run the program:

```bash
java HelloColy
```

You should see the output:

```
Hello, COLY!
```

Congratulations! You've just run your first Java program!

:::note
The filename must match the class name. Since our class is `HelloColy`, the file must be `HelloColy.java`.
:::

## Next Steps

Now that you've written your first program, let's learn about version control with Git.
