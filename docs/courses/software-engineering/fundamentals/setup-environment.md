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

## Build Tools

As you progress, you'll learn about **Maven**, which helps with:

- Dependency management (automatically downloading libraries)
- Project building and compilation
- Running tests
- Packaging your application

We'll cover Maven in detail after you write your first program!

## Next Steps

Now that your environment is set up, let's write your first Java program!
