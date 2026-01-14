---
sidebar_position: 2
---

# Producing Events with Kafka

Learn how to send events to Kafka using Spring Boot and the KafkaTemplate.

## Project Setup

First, create a Spring Boot project with Kafka dependencies. Add the following to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.kafka</groupId>
        <artifactId>spring-kafka</artifactId>
    </dependency>
</dependencies>
```

## Configuring Kafka Connection

Add Kafka configuration to your `application.properties`:

```properties
# Kafka broker address
spring.kafka.bootstrap-servers=localhost:9092

# Producer configuration
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.springframework.kafka.support.serializer.JsonSerializer

# Trust all packages for JSON deserialization
spring.kafka.producer.properties.spring.json.trusted.packages=*
```

For `application.yml`:

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      properties:
        spring.json.trusted.packages: "*"
```

## Creating an Event Class

Define a class to represent your event:

```java
public class OrderEvent {
    private String eventType;
    private String orderId;
    private String customerId;
    private double totalAmount;
    private LocalDateTime timestamp;

    public OrderEvent() {
        this.timestamp = LocalDateTime.now();
    }

    public OrderEvent(String eventType, String orderId, String customerId, double totalAmount) {
        this();
        this.eventType = eventType;
        this.orderId = orderId;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
    }

    // Getters and setters
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
```

## Using KafkaTemplate

The `KafkaTemplate` is Spring's high-level abstraction for sending messages to Kafka. Inject it into your service:

```java
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderEventProducer {

    private static final String TOPIC = "orders";

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderEventProducer(KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendOrderCreatedEvent(String orderId, String customerId, double total) {
        OrderEvent event = new OrderEvent("ORDER_CREATED", orderId, customerId, total);
        kafkaTemplate.send(TOPIC, orderId, event);
    }
}
```

## Synchronous vs Asynchronous Sending

### Fire and Forget (Asynchronous)

The simplest approach - send and don't wait:

```java
public void sendAsync(OrderEvent event) {
    kafkaTemplate.send("orders", event.getOrderId(), event);
    // Execution continues immediately
}
```

### With Callback (Asynchronous with Notification)

Get notified when the send completes or fails:

```java
public void sendWithCallback(OrderEvent event) {
    CompletableFuture<SendResult<String, OrderEvent>> future =
        kafkaTemplate.send("orders", event.getOrderId(), event);

    future.whenComplete((result, ex) -> {
        if (ex == null) {
            System.out.println("Sent message with offset: " +
                result.getRecordMetadata().offset());
        } else {
            System.err.println("Failed to send message: " + ex.getMessage());
        }
    });
}
```

### Synchronous Send (Wait for Confirmation)

Block until the send completes:

```java
public void sendSync(OrderEvent event) {
    try {
        SendResult<String, OrderEvent> result =
            kafkaTemplate.send("orders", event.getOrderId(), event)
                .get(10, TimeUnit.SECONDS);

        System.out.println("Message sent to partition " +
            result.getRecordMetadata().partition() +
            " with offset " + result.getRecordMetadata().offset());
    } catch (Exception e) {
        throw new RuntimeException("Failed to send event", e);
    }
}
```

## Complete Producer Example

Here's a complete example with a REST controller:

```java
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderEventProducer eventProducer;

    public OrderController(OrderEventProducer eventProducer) {
        this.eventProducer = eventProducer;
    }

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody CreateOrderRequest request) {
        // Generate order ID
        String orderId = UUID.randomUUID().toString();

        // Business logic to create order would go here

        // Publish event
        eventProducer.sendOrderCreatedEvent(
            orderId,
            request.getCustomerId(),
            request.getTotalAmount()
        );

        return ResponseEntity.ok(orderId);
    }
}
```

```java
public class CreateOrderRequest {
    private String customerId;
    private double totalAmount;

    // Getters and setters
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
}
```

## Message Keys

The **key** determines which partition a message goes to. Messages with the same key always go to the same partition, maintaining order:

```java
// Use orderId as key - all events for same order go to same partition
kafkaTemplate.send("orders", orderId, event);

// Without key - round-robin distribution across partitions
kafkaTemplate.send("orders", event);
```

**Best practice**: Use a business identifier as the key (orderId, customerId) to keep related events together.

## Producer Configuration Options

| Property | Description | Default |
|----------|-------------|---------|
| `acks` | How many broker acknowledgments to wait for | `1` |
| `retries` | Number of retry attempts on failure | `2147483647` |
| `batch.size` | Batch size in bytes before sending | `16384` |
| `linger.ms` | Time to wait for more messages before sending | `0` |
| `buffer.memory` | Total memory for buffering | `33554432` |

Configure in `application.properties`:

```properties
spring.kafka.producer.acks=all
spring.kafka.producer.retries=3
spring.kafka.producer.properties.batch.size=32768
spring.kafka.producer.properties.linger.ms=5
```

## Running Kafka Locally

For development, use Docker Compose:

```yaml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
```

Start with:

```bash
docker-compose up -d
```

## Practice Exercise

Create a producer for a notification system:

1. Create a `NotificationEvent` class with fields: `type`, `userId`, `message`, `channel` (EMAIL, SMS, PUSH)
2. Create a `NotificationProducer` service that sends to a "notifications" topic
3. Create a REST endpoint `POST /api/notifications` that accepts notification details and publishes an event
4. Use the userId as the message key

**Bonus**: Add a callback to log successful sends and handle failures.

## Key Takeaways

- Use `KafkaTemplate` to send messages to Kafka topics
- Configure serializers to convert Java objects to JSON
- Choose between async (fire-and-forget) and sync (wait for confirmation) based on your needs
- Use message keys to ensure related events go to the same partition
- Handle failures appropriately with callbacks or try-catch

## Next Steps

Now that you can produce events, learn how to consume them in the next lesson.
