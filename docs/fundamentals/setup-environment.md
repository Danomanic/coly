---
sidebar_position: 2
---

# Setting Up Your Development Environment

Before we start coding, we need to set up the tools you'll use as a Java developer.

## What You'll Need

### 1. Code Editor / IDE

An IDE (Integrated Development Environment) is where you'll write your code. We recommend **IntelliJ IDEA Community Edition**:

- Free and open-source
- Works on Windows, Mac, and Linux
- Excellent Java support
- Beginner-friendly with helpful code suggestions

**Download**: [https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download/)

**Alternative**: Visual Studio Code with Java extensions is also a good option if you prefer a lighter editor.

### 2. Java Development Kit (JDK)

The JDK contains everything you need to develop Java applications. We recommend **Java 17 or later** (LTS version):

**Download**: [https://adoptium.net/](https://adoptium.net/) (Eclipse Temurin)

:::tip
Java 17 is a Long-Term Support (LTS) version, making it a stable choice for learning and production use.
:::

### 3. Terminal/Command Line

You'll use the terminal to run programs and commands:

- **Windows**: Use PowerShell or Windows Terminal
- **Mac**: Use Terminal (comes pre-installed)
- **Linux**: Use your distribution's terminal

## Verify Installation

Open your terminal and run:

```bash
java --version
```

You should see something like `openjdk 17.0.x`.

Also verify the Java compiler:

```bash
javac --version
```

## Your First Java Program

Create a new file called `HelloColy.java` and add:

```java
public class HelloColy {
    public static void main(String[] args) {
        System.out.println("Hello, COLY!");
    }
}
```

Compile and run it in your terminal:

```bash
javac HelloColy.java
java HelloColy
```

🎉 Congratulations! You've just run your first Java program!

:::note
The filename must match the class name. Since our class is `HelloColy`, the file must be `HelloColy.java`.
:::

## Build Tools (Optional for Now)

As you progress, you'll learn about build tools like:

- **Maven**: Dependency management and project building
- **Gradle**: Modern build automation tool

We'll cover these in later lessons!

## Next Steps

Now that your environment is set up, let's learn about variables and data types in Java.
