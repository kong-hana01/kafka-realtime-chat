### How to run

```sh
docker compose up zookeeper --build --remove-orphans --force-recreate -d
docker compose up kafka --build --remove-orphans --force-recreate -d
docker compose up dev-db --build --remove-orphans --force-recreate -d
docker compose up express --build --remove-orphans --force-recreate -d
```
