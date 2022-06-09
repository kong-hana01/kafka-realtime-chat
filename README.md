# Franz DM

- Watch [Demo Video](https://user-images.githubusercontent.com/91586956/172767747-5b97461e-c733-4499-8837-2930339eaa40.mp4)

- Go visit [Franz DM](https://franz.sinwoobang.me) and have fun :)

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

![image](https://user-images.githubusercontent.com/91586956/172762502-664c4028-ada3-4a23-b632-d24ee4766503.png)

#### BackEnd

- Node.js
  - API
  - WebSocket Server
- Apache Kafka
- PostgreSQL

#### FrontEnd

- WebSocket Client
- React

## Getting Started

```sh
git clone http://khuhub.khu.ac.kr/2014104103/kafka-realtime-chat.git
```

### Server

[![asciicast](https://asciinema.org/a/NWLRDluqB0Smu2rhxkAADFdxm.svg)](https://asciinema.org/a/NWLRDluqB0Smu2rhxkAADFdxm)

```sh
cd server
docker compose up
```

### Client

```sh
cd client
npm install
npm start
```

Then go to <http://localhost:3000/> and use the chatting service.

## Deployment

It is same as `Getting Started`. You can stop instances by the following command.

```sh
docker compose down
```

After this process, go to `Getting Started` and repeat the steps.

## Contributing

Please refer to each project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we can review your changes

## Contact

- 방신우: sinwoobang@gmail.com
- 김상화: shkim18@khu.ac.kr
- 최한빈: gksqlsl11@khu.ac.kr
