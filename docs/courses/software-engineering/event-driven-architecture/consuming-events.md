---
sidebar_position: 3
---

# Consuming Events with Kafka

Learn how to receive and process events from Kafka using Spring Boot's `@KafkaListener`.

## Project Setup

Use the same dependencies as the producer. Add the following to your `pom.xml`:

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

## Configuring Kafka Consumer

Add consumer configuration to your `application.properties`:

```properties
# Kafka broker address
spring.kafka.bootstrap-servers=localhost:9092

# Consumer configuration
spring.kafka.consumer.group-id=order-service
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.springframework.kafka.support.serializer.JsonDeserializer

# Trust packages for JSON deserialization
spring.kafka.consumer.properties.spring.json.trusted.packages=*
```

For `application.yml`:

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: order-service
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      properties:
        spring.json.trusted.packages: "*"
```

## Creating a Simple Consumer

Use the `@KafkaListener` annotation to consume messages:

```java
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderEventConsumer {

    @KafkaListener(topics = "orders", groupId = "order-service")
    public void handleOrderEvent(OrderEvent event) {
        System.out.println("Received order event: " + event.getEventType());
        System.out.println("Order ID: " + event.getOrderId());
        System.out.println("Customer: " + event.getCustomerId());
        System.out.println("Amount: " + event.getTotalAmount());

        // Process the event based on type
        switch (event.getEventType()) {
            case "ORDER_CREATED":
                processNewOrder(event);
                break;
            case "ORDER_CANCELLED":
                processCancellation(event);
                break;
            default:
                System.out.println("Unknown event type: " + event.getEventType());
        }
    }

    private void processNewOrder(OrderEvent event) {
        // Business logic for new orders
        System.out.println("Processing new order: " + event.getOrderId());
    }

    private void processCancellation(OrderEvent event) {
        // Business logic for cancellations
        System.out.println("Processing cancellation: " + event.getOrderId());
    }
}
```

## Consumer Groups

A **consumer group** is a set of consumers that work together to consume messages from topics. Each partition is consumed by exactly one consumer in the group.

```
Topic: orders (3 partitions)
├── Partition 0 → Consumer A
├── Partition 1 → Consumer B
└── Partition 2 → Consumer A  (if only 2 consumers)
```

### Why Consumer Groups Matter

| Scenario | Consumers | Partitions | Result |
|----------|-----------|------------|--------|
| 1 consumer, 3 partitions | 1 | 3 | One consumer reads all |
| 3 consumers, 3 partitions | 3 | 3 | One partition per consumer |
| 5 consumers, 3 partitions | 5 | 3 | 2 consumers idle |
| Different groups | Any | Any | Each group gets all messages |

**Key point**: Messages are shared within a group but duplicated across groups. This allows multiple services to react to the same events.

## Accessing Message Metadata

Get additional information about the message:

```java
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;

@KafkaListener(topics = "orders", groupId = "order-service")
public void handleWithMetadata(ConsumerRecord<String, OrderEvent> record) {
    String key = record.key();
    OrderEvent event = record.value();
    int partition = record.partition();
    long offset = record.offset();
    long timestamp = record.timestamp();

    System.out.println("Received from partition " + partition + " at offset " + offset);
    System.out.println("Key: " + key);
    System.out.println("Event: " + event.getEventType());
}
```

## Listening to Multiple Topics

Subscribe to multiple topics with a single listener:

```java
@KafkaListener(topics = {"orders", "payments", "shipping"}, groupId = "notification-service")
public void handleMultipleTopics(ConsumerRecord<String, Object> record) {
    String topic = record.topic();

    switch (topic) {
        case "orders":
            sendOrderNotification(record.value());
            break;
        case "payments":
            sendPaymentNotification(record.value());
            break;
        case "shipping":
            sendShippingNotification(record.value());
            break;
    }
}
```

## Error Handling

### Basic Error Handling

Wrap processing in try-catch:

```java
@KafkaListener(topics = "orders", groupId = "order-service")
public void handleWithErrorHandling(OrderEvent event) {
    try {
        processOrder(event);
    } catch (Exception e) {
        // Log the error
        System.err.println("Failed to process order: " + event.getOrderId());
        System.err.println("Error: " + e.getMessage());

        // Decide what to do: retry, send to dead letter queue, etc.
    }
}
```

### Custom Error Handler

Configure a global error handler:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.util.backoff.FixedBackOff;

@Configuration
public class KafkaConfig {

    @Bean
    public DefaultErrorHandler errorHandler() {
        // Retry 3 times with 1 second delay
        return new DefaultErrorHandler(new FixedBackOff(1000L, 3));
    }
}
```

### Dead Letter Topic

Send failed messages to a dead letter topic for later analysis:

```java
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
import org.springframework.kafka.listener.DefaultErrorHandler;

@Configuration
public class KafkaConfig {

    @Bean
    public DefaultErrorHandler errorHandler(KafkaTemplate<String, Object> template) {
        DeadLetterPublishingRecoverer recoverer =
            new DeadLetterPublishingRecoverer(template);

        return new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 3));
    }
}
```

Failed messages will be sent to `{original-topic}.DLT` (e.g., `orders.DLT`).

## Manual Offset Control

By default, Spring commits offsets automatically. For more control:

```java
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;

@KafkaListener(topics = "orders", groupId = "order-service")
public void handleWithManualAck(OrderEvent event, Acknowledgment ack) {
    try {
        processOrder(event);
        ack.acknowledge();  // Commit offset only after successful processing
    } catch (Exception e) {
        // Don't acknowledge - message will be redelivered
        throw e;
    }
}
```

Enable manual acknowledgment in configuration:

```properties
spring.kafka.listener.ack-mode=manual
```

## Complete Consumer Example

Here's a complete example with multiple event types and error handling:

```java
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderEventConsumer {

    private final EmailService emailService;
    private final InventoryService inventoryService;

    public OrderEventConsumer(EmailService emailService, InventoryService inventoryService) {
        this.emailService = emailService;
        this.inventoryService = inventoryService;
    }

    @KafkaListener(topics = "orders", groupId = "order-processor")
    public void handleOrderEvent(OrderEvent event) {
        System.out.println("Processing: " + event.getEventType() +
            " for order " + event.getOrderId());

        switch (event.getEventType()) {
            case "ORDER_CREATED":
                handleOrderCreated(event);
                break;
            case "ORDER_CANCELLED":
                handleOrderCancelled(event);
                break;
            case "ORDER_SHIPPED":
                handleOrderShipped(event);
                break;
            default:
                System.out.println("Unhandled event type: " + event.getEventType());
        }
    }

    private void handleOrderCreated(OrderEvent event) {
        // Reserve inventory
        inventoryService.reserveStock(event.getOrderId());

        // Send confirmation email
        emailService.sendOrderConfirmation(
            event.getCustomerId(),
            event.getOrderId(),
            event.getTotalAmount()
        );
    }

    private void handleOrderCancelled(OrderEvent event) {
        // Release inventory
        inventoryService.releaseStock(event.getOrderId());

        // Send cancellation email
        emailService.sendCancellationNotice(
            event.getCustomerId(),
            event.getOrderId()
        );
    }

    private void handleOrderShipped(OrderEvent event) {
        // Send shipping notification
        emailService.sendShippingNotification(
            event.getCustomerId(),
            event.getOrderId()
        );
    }
}
```

## Consumer Configuration Options

| Property | Description | Default |
|----------|-------------|---------|
| `group.id` | Consumer group identifier | Required |
| `auto.offset.reset` | What to do when no offset exists | `latest` |
| `enable.auto.commit` | Automatically commit offsets | `true` |
| `max.poll.records` | Max records per poll | `500` |
| `session.timeout.ms` | Consumer session timeout | `45000` |

Configure in `application.properties`:

```properties
spring.kafka.consumer.group-id=my-service
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.enable-auto-commit=true
spring.kafka.consumer.max-poll-records=100
```

## Practice Exercise

Create a notification service that consumes order events:

1. Create an `OrderEventConsumer` that listens to the "orders" topic
2. For `ORDER_CREATED` events, log `"Sending order confirmation to customer " + customerId`
3. For `ORDER_SHIPPED` events, log `"Sending shipping notification to customer " + customerId`
4. Add error handling that logs failures without crashing
5. Use consumer group "notification-service"

**Bonus**: Create a second consumer class in a different consumer group (e.g., "analytics-service") that logs all events for analytics purposes. Observe how both consumers receive the same messages.

## Key Takeaways

- Use `@KafkaListener` to consume messages from Kafka topics
- Consumer groups distribute work across multiple consumers
- Messages with the same key always go to the same consumer (within a group)
- Handle errors gracefully with try-catch or custom error handlers
- Use dead letter topics to capture failed messages for analysis
- Consider manual offset commits for critical processing

## Summary

You've now learned the fundamentals of event driven architecture with Apache Kafka and Spring Boot:

1. **Core Concepts**: Events, producers, consumers, topics, and partitions
2. **Producing Events**: Using KafkaTemplate to send messages with proper serialization
3. **Consuming Events**: Using @KafkaListener with consumer groups and error handling

These patterns form the foundation for building scalable, loosely coupled systems. As you build more complex systems, you'll encounter additional patterns like event sourcing, CQRS, and saga orchestration.
