---
sidebar_position: 1
---

# REST API Design Challenge

Design and implement a complete REST API - putting your API knowledge into practice.

## Difficulty
⭐⭐⭐ Advanced

## Problem Description

Design and implement a REST API for a **Task Management System**. This challenge combines your knowledge of REST principles, Spring Boot, and API best practices to build a real-world application.

## Requirements

Build a REST API that allows users to:
- Create, read, update, and delete tasks
- Filter tasks by status
- Assign tasks to users
- Mark tasks as complete

## API Specification

Design endpoints following REST best practices:

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/{id}` | Get a specific task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |
| PATCH | `/api/tasks/{id}/complete` | Mark task as complete |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| status | String | Filter by status (PENDING, IN_PROGRESS, COMPLETED) |
| assignee | String | Filter by assigned user |
| priority | String | Filter by priority (LOW, MEDIUM, HIGH) |

## Skills Practised

- REST API design principles
- Spring Boot development
- HTTP methods and status codes
- Request/Response handling
- Input validation
- Error handling
- API documentation

## Data Model

### Task

```java
public class Task {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;      // PENDING, IN_PROGRESS, COMPLETED
    private Priority priority;      // LOW, MEDIUM, HIGH
    private String assignee;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime dueDate;
}
```

## Example Requests and Responses

### Create Task

**Request:**
```http
POST /api/tasks
Content-Type: application/json

{
    "title": "Implement login feature",
    "description": "Add user authentication using JWT",
    "priority": "HIGH",
    "assignee": "john.doe",
    "dueDate": "2024-02-15T17:00:00"
}
```

**Response (201 Created):**
```json
{
    "id": 1,
    "title": "Implement login feature",
    "description": "Add user authentication using JWT",
    "status": "PENDING",
    "priority": "HIGH",
    "assignee": "john.doe",
    "createdAt": "2024-01-20T10:30:00",
    "updatedAt": "2024-01-20T10:30:00",
    "dueDate": "2024-02-15T17:00:00"
}
```

### List Tasks with Filters

**Request:**
```http
GET /api/tasks?status=PENDING&priority=HIGH
```

**Response (200 OK):**
```json
{
    "content": [
        {
            "id": 1,
            "title": "Implement login feature",
            "status": "PENDING",
            "priority": "HIGH",
            "assignee": "john.doe"
        }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "page": 0,
    "size": 10
}
```

### Error Response

**Response (404 Not Found):**
```json
{
    "timestamp": "2024-01-20T10:30:00",
    "status": 404,
    "error": "Not Found",
    "message": "Task not found with id: 999",
    "path": "/api/tasks/999"
}
```

## Implementation Steps

### Step 1: Create the Project

Create a Spring Boot project with these dependencies:
- Spring Web
- Spring Boot DevTools
- Validation
- SpringDoc OpenAPI (for documentation)

### Step 2: Define the Model

```java
public enum TaskStatus {
    PENDING, IN_PROGRESS, COMPLETED
}

public enum Priority {
    LOW, MEDIUM, HIGH
}

public class Task {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private TaskStatus status = TaskStatus.PENDING;

    private Priority priority = Priority.MEDIUM;

    private String assignee;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime dueDate;

    // Constructors, getters, setters
}
```

### Step 3: Implement the Controller

```java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String assignee) {
        // Implementation
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        // Implementation
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        // Implementation
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody Task task) {
        // Implementation
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        // Implementation
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable Long id) {
        // Implementation
    }
}
```

### Step 4: Add Error Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(TaskNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            "Not Found",
            ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        // Handle validation errors
    }
}
```

### Step 5: Add API Documentation

```java
@Operation(summary = "Create a new task")
@ApiResponses({
    @ApiResponse(responseCode = "201", description = "Task created"),
    @ApiResponse(responseCode = "400", description = "Invalid input")
})
@PostMapping
public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
    // Implementation
}
```

## Acceptance Criteria

Your API should:

### Functional Requirements
- [ ] Create tasks with title, description, priority, and due date
- [ ] Retrieve all tasks with optional filtering
- [ ] Retrieve a single task by ID
- [ ] Update existing tasks
- [ ] Delete tasks
- [ ] Mark tasks as complete
- [ ] Return appropriate HTTP status codes

### Non-Functional Requirements
- [ ] Validate input (title required, valid enum values)
- [ ] Return meaningful error messages
- [ ] Document API with OpenAPI/Swagger
- [ ] Follow REST naming conventions
- [ ] Handle edge cases gracefully

## Testing Your API

### Using cURL

```bash
# Create a task
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test task", "priority": "HIGH"}'

# Get all tasks
curl http://localhost:8080/api/tasks

# Get tasks by status
curl "http://localhost:8080/api/tasks?status=PENDING"

# Update a task
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated task", "status": "IN_PROGRESS"}'

# Complete a task
curl -X PATCH http://localhost:8080/api/tasks/1/complete

# Delete a task
curl -X DELETE http://localhost:8080/api/tasks/1
```

### Using REST Assured (Integration Tests)

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class TaskApiTest {

    @LocalServerPort
    private int port;

    @BeforeEach
    void setup() {
        RestAssured.port = port;
    }

    @Test
    void shouldCreateTask() {
        given()
            .contentType("application/json")
            .body("""
                {
                    "title": "New task",
                    "priority": "HIGH"
                }
                """)
        .when()
            .post("/api/tasks")
        .then()
            .statusCode(201)
            .body("title", equalTo("New task"))
            .body("status", equalTo("PENDING"))
            .body("id", notNullValue());
    }

    @Test
    void shouldReturn404ForNonExistentTask() {
        when()
            .get("/api/tasks/99999")
        .then()
            .statusCode(404)
            .body("message", containsString("not found"));
    }

    @Test
    void shouldValidateRequiredFields() {
        given()
            .contentType("application/json")
            .body("{}")
        .when()
            .post("/api/tasks")
        .then()
            .statusCode(400);
    }
}
```

## Extension Challenges

### 1. Add Pagination
Implement pagination for the task list:
```http
GET /api/tasks?page=0&size=10&sort=createdAt,desc
```

### 2. Add Search
Search tasks by title or description:
```http
GET /api/tasks/search?q=login
```

### 3. Add Subtasks
Allow tasks to have subtasks:
```http
POST /api/tasks/1/subtasks
GET /api/tasks/1/subtasks
```

### 4. Add Comments
Allow users to comment on tasks:
```http
POST /api/tasks/1/comments
GET /api/tasks/1/comments
```

### 5. Add Authentication
Secure the API with JWT authentication.

### 6. Add Database Persistence
Replace in-memory storage with a database using Spring Data JPA.

## Evaluation Criteria

Your solution will be evaluated on:

| Criteria | Weight | Description |
|----------|--------|-------------|
| Correctness | 30% | Does the API work as specified? |
| REST Design | 25% | Proper use of methods, status codes, URLs |
| Code Quality | 20% | Clean, readable, maintainable code |
| Error Handling | 15% | Graceful handling of errors |
| Documentation | 10% | API is well-documented |

## What You've Learned

After completing this challenge, you should understand:
- ✅ How to design RESTful APIs
- ✅ Spring Boot controller development
- ✅ Request validation and error handling
- ✅ HTTP status codes and their meanings
- ✅ API documentation with OpenAPI
- ✅ Testing APIs with REST Assured

## Related Course Material

This challenge applies concepts from:
- [RESTful APIs](/courses/software-engineering/apis/rest-apis)
- [Building a REST API in Java](/courses/software-engineering/apis/building-rest-api-java)
- [Testing APIs with REST Assured](/courses/software-engineering/apis/testing-apis-rest-assured)
- [OpenAPI and Swagger](/courses/software-engineering/apis/openapi-swagger)
