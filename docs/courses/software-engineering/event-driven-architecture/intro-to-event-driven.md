---
sidebar_position: 1
---

# Introduction to Event Driven Architecture

Learn how to build scalable, loosely coupled systems using events instead of direct communication.

## What is Event Driven Architecture?

Event Driven Architecture (EDA) is a design pattern where applications communicate by producing and consuming events. Instead of making direct calls between services, components publish events that other components can react to.

Think of it like a news broadcast:
- A news station (producer) broadcasts news
- Anyone with a TV (consumer) can tune in and react to the news
- The news station doesn't need to know who is watching
- Viewers can join or leave at any time

## Why Use Event Driven Architecture?

| Benefit | Description |
|---------|-------------|
| Loose Coupling | Services don't need to know about each other directly |
| Scalability | Add more consumers without changing producers |
| Resilience | If a consumer fails, events can be processed later |
| Flexibility | Easy to add new functionality by subscribing to existing events |
| Audit Trail | Events provide a natural log of what happened in your system |

## Core Concepts

### Events

An **event** is a record of something that happened in your system:

```json
{
  "eventType": "OrderCreated",
  "timestamp": "2024-03-15T14:30:00Z",
  "data": {
    "orderId": "12345",
    "customerId": "C001",
    "totalAmount": 99.99
  }
}
```

Events should be:
- **Immutable**: Once created, they never change
- **Self-contained**: Include all relevant information
- **Named in past tense**: Describe what happened (OrderCreated, not CreateOrder)

### Producers

A **producer** is any component that creates and publishes events. For example:
- An order service publishing an `OrderCreated` event
- A payment service publishing a `PaymentProcessed` event
- A user service publishing a `UserRegistered` event

### Consumers

A **consumer** is any component that subscribes to and processes events. A single event can have multiple consumers:
- Email service sends order confirmation
- Inventory service updates stock levels
- Analytics service records the sale

### Topics

A **topic** is a named channel where events are published. Consumers subscribe to topics they're interested in:

```
orders-topic     → OrderCreated, OrderCancelled, OrderShipped
payments-topic   → PaymentProcessed, PaymentFailed, RefundIssued
users-topic      → UserRegistered, UserUpdated, UserDeleted
```

## Introduction to Apache Kafka

**Apache Kafka** is a distributed streaming platform designed for high-throughput, fault-tolerant event processing. It's one of the most popular choices for implementing event driven architecture.

### Key Kafka Concepts

| Concept | Description |
|---------|-------------|
| Broker | A Kafka server that stores and serves events |
| Topic | A category or feed name to which events are published |
| Partition | Topics are split into partitions for parallel processing |
| Offset | A unique identifier for each event within a partition |
| Consumer Group | A group of consumers that share the work of reading from topics |

### Why Kafka?

1. **High Throughput**: Handle millions of events per second
2. **Durability**: Events are persisted to disk and replicated
3. **Scalability**: Easily scale by adding more brokers and partitions
4. **Ordering**: Events within a partition maintain their order
5. **Replayability**: Consumers can re-read events from any point

## Event Driven vs Request/Response

| Aspect | Request/Response | Event Driven |
|--------|------------------|--------------|
| Coupling | Tight - caller knows the callee | Loose - producer doesn't know consumers |
| Synchronous | Yes - caller waits for response | No - fire and forget |
| Failure Handling | Immediate - caller handles errors | Deferred - retry or dead letter queue |
| Scaling | Scale all services together | Scale producers and consumers independently |
| Adding Features | Modify existing services | Add new consumers without changes |

## When to Use Event Driven Architecture

**Good use cases:**
- Microservices that need to stay in sync
- Audit logging and analytics
- Real-time notifications
- Workflow orchestration
- Integration with external systems

**Consider alternatives when:**
- You need immediate, synchronous responses
- Simple CRUD applications with few components
- Strong consistency is required between operations

## Practice Exercise

Think about an e-commerce system. Identify:

1. What events might occur? (Hint: think about orders, payments, shipping)
2. What services would produce these events?
3. What services would consume each event?

**Example Answer:**

Events:
- `OrderPlaced` - Produced by Order Service
- `PaymentReceived` - Produced by Payment Service
- `ItemShipped` - Produced by Shipping Service

Consumers for `OrderPlaced`:
- Payment Service (to process payment)
- Inventory Service (to reserve stock)
- Notification Service (to send confirmation email)

## Next Steps

Ready to start sending events? In the next lesson, you'll learn how to create a Kafka producer with Spring Boot.
