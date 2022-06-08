## About the Project

The project is a recoverable chat service using Apache Kafka.

### Characteristics

- It provides a chat service.
- When you log in, it restores the chat history.
- Additional chatting is available.
- Chatting in real time.

Instead of using a relational database for chat implementation, Apache Kafka is used.

- It recovers the previous content by taking advantage of the producer/consumer pattern, which is the architecture of Apache Kafka.

### Built With

#### BackEnd

- Node.js
  - Api
  - WebSocket Server
- Apache Kafka

#### FrontEnd

- Publishing
- WebSocket Client

### Server

```sh
cd server
docker compose up
```
