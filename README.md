<img alt="Apache Kafka" src ="https://img.shields.io/badge/Apache Kafka-231F20.svg?&style=for-the-badge&logo=Apache Kafka&logoColor=white"/>
<img alt="Node.js" src ="https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white"/>
<img alt="Docker" src ="https://img.shields.io/badge/Docker-2496ED.svg?&style=for-the-badge&logo=Docker&logoColor=white"/>
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/>
<img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-4169E1.svg?&style=for-the-badge&logo=PostgreSQL&logoColor=white"/>

# Franz DM

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

![image](https://user-images.githubusercontent.com/91586956/172683430-047f1453-4a66-4328-a440-2731ffedeba8.png)

#### BackEnd

- Node.js
  - Api
  - WebSocket Server
- Apache Kafka

#### FrontEnd

- Publishing
- WebSocket Client
- React

## Getting Started(Installation)

`git clone http://khuhub.khu.ac.kr/2014104103/kafka-realtime-chat.git`

### Server

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

## contributing

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
