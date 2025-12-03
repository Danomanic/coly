---
sidebar_position: 4
---

# Maven Basics

Learn how to use Maven, the essential build automation and dependency management tool for Java projects.

## What is Maven?

**Maven** is a build automation tool that helps you:
- Manage project dependencies (libraries and frameworks)
- Compile and package your code
- Run tests
- Generate documentation
- Follow consistent project structure

Think of Maven as your project's manager - it handles all the tedious tasks so you can focus on writing code.

## Why Use Maven?

- **Dependency Management**: Automatically downloads and manages libraries
- **Standard Project Structure**: Everyone follows the same layout
- **Build Lifecycle**: Standardised build process (compile, test, package)
- **Convention Over Configuration**: Sensible defaults that just work
- **Wide Adoption**: Used by most Java projects and teams

## Maven Project Structure

Maven projects follow a standard directory structure:

```
my-project/
├── pom.xml                 # Project configuration file
├── src/
│   ├── main/
│   │   ├── java/          # Your application code
│   │   └── resources/     # Configuration files, properties
│   └── test/
│       ├── java/          # Your test code
│       └── resources/     # Test resources
└── target/                # Compiled code and packages (generated)
```

## The POM File

The `pom.xml` (Project Object Model) is Maven's configuration file. Here's a basic example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Project Coordinates -->
    <groupId>com.coly</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- Java Version -->
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- Dependencies -->
    <dependencies>
        <!-- JUnit for testing -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

### Understanding the POM

- **groupId**: Usually your organisation's domain in reverse (e.g., `com.coly`)
- **artifactId**: Your project's name (e.g., `my-app`)
- **version**: Your project's version (e.g., `1.0-SNAPSHOT`)
- **dependencies**: External libraries your project needs

## Adding Dependencies

To add a library to your project, add a dependency to the `pom.xml`:

```xml
<dependencies>
    <!-- Spring Boot -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>3.2.0</version>
    </dependency>

    <!-- JSON processing -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.15.0</version>
    </dependency>
</dependencies>
```

:::tip Finding Dependencies
Search for libraries on [Maven Central Repository](https://mvnrepository.com/). It provides the exact dependency XML to copy into your pom.xml.
:::

## Common Maven Commands

### Clean and Compile

```bash
# Remove old compiled files
mvn clean

# Compile your code
mvn compile

# Clean and compile in one command
mvn clean compile
```

### Running Tests

```bash
# Run all tests
mvn test

# Skip tests (useful for quick builds)
mvn install -DskipTests
```

### Packaging

```bash
# Create a JAR file
mvn package

# The JAR will be in the target/ directory
# Example: target/my-app-1.0-SNAPSHOT.jar
```

### Install to Local Repository

```bash
# Install to your local Maven repository (~/.m2/repository)
mvn install
```

### Running Your Application

```bash
# Run a Java application with Maven
mvn exec:java -Dexec.mainClass="com.coly.Main"
```

## Dependency Scopes

Dependencies can have different scopes:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>  <!-- Only available during testing -->
</dependency>
```

Common scopes:
- **compile** (default): Available everywhere
- **test**: Only available in test code
- **provided**: Provided by the runtime (e.g., servlet API)
- **runtime**: Needed at runtime but not for compilation

## Creating a Maven Project

### Using IntelliJ IDEA

1. File → New → Project
2. Select "Maven" as the build system
3. Fill in GroupId and ArtifactId
4. Click Create

### Using Command Line

```bash
mvn archetype:generate \
  -DgroupId=com.coly \
  -DartifactId=my-app \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

### Using Spring Initializr

For Spring Boot projects, use [start.spring.io](https://start.spring.io/):
1. Choose Maven as the project type
2. Select dependencies
3. Generate and download the project

## Maven Build Lifecycle

Maven has a standard build lifecycle:

1. **validate**: Check if project is correct
2. **compile**: Compile source code
3. **test**: Run unit tests
4. **package**: Create JAR/WAR file
5. **verify**: Run integration tests
6. **install**: Install package to local repository
7. **deploy**: Deploy to remote repository

When you run a phase (e.g., `mvn package`), all previous phases run automatically.

## Practice Exercise

Create a simple Maven project:

1. Create a new Maven project with:
   - GroupId: `com.coly.learning`
   - ArtifactId: `calculator`
   - Version: `1.0-SNAPSHOT`

2. Add JUnit dependency

3. Create a `Calculator` class in `src/main/java/com/coly/learning/`

4. Create tests in `src/test/java/com/coly/learning/`

5. Run `mvn test` to verify everything works

## Common Issues

### Issue: Maven not found
```bash
mvn --version
# If not found, download Maven from https://maven.apache.org/
```

### Issue: Dependencies not downloading
```bash
# Clear local repository cache and try again
rm -rf ~/.m2/repository
mvn clean install
```

### Issue: Wrong Java version
```xml
<!-- Set correct Java version in pom.xml -->
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
</properties>
```

## Next Steps

Now that you understand Maven, you're ready to build real Java applications with proper dependency management and project structure. Next, learn about Test Driven Development to write better, more reliable code.
