---
sidebar_position: 2
---

# Containerisation with Docker

Learn how to package your applications into containers for consistent deployment across any environment.

## What is Containerisation?

Containerisation is a way to package your application with all its dependencies into a single, portable unit called a container.

### Traditional Deployment vs Containers

**Traditional**:
- "It works on my machine" problems
- Different environments have different setups
- Difficult to replicate production locally

**Containers**:
- Consistent across all environments
- Lightweight and fast
- Easy to deploy and scale

## What is Docker?

Docker is the most popular containerisation platform. It allows you to:
- Build container images
- Run containers
- Share containers via Docker Hub

## Installing Docker

Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)

Verify installation:
```bash
docker --version
```

## Docker Concepts

### Images
A blueprint for a container. Contains your application and all dependencies.

### Containers
A running instance of an image.

### Dockerfile
A text file with instructions to build an image.

## Creating a Dockerfile for Java

Here's a Dockerfile for a Spring Boot application:

```dockerfile
# Use official Java runtime as base image
FROM eclipse-temurin:17-jre

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/myapp.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Building and Running

### Build the Image

```bash
docker build -t myapp:1.0 .
```

### Run the Container

```bash
docker run -p 8080:8080 myapp:1.0
```

This maps port 8080 on your machine to port 8080 in the container.

## Common Docker Commands

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop <container-id>

# Remove a container
docker rm <container-id>

# List images
docker images

# Remove an image
docker rmi <image-id>

# View container logs
docker logs <container-id>

# Execute command in running container
docker exec -it <container-id> /bin/bash
```

## Multi-Container Applications with Docker Compose

For applications with multiple services (app + database), use Docker Compose.

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_PASSWORD=secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

### Running with Docker Compose

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down
```

## Best Practices

1. **Use Official Base Images**: Start with official images from Docker Hub
2. **Keep Images Small**: Use slim or alpine variants when possible
3. **One Process Per Container**: Each container should do one thing
4. **Use .dockerignore**: Exclude unnecessary files from the build context
5. **Don't Run as Root**: Create a user for running your application
6. **Use Multi-Stage Builds**: Separate build and runtime environments

### Example .dockerignore

```
target/
*.md
.git
.gitignore
```

## Practice Exercise

1. Create a simple Java application
2. Write a Dockerfile for it
3. Build the Docker image
4. Run it in a container
5. Add a PostgreSQL database using Docker Compose

## Next Steps

Now that you can containerize applications, let's learn about CI/CD pipelines to automate building and deploying these containers.
