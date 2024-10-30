FROM maven:3.8.1-openjdk-17 AS builder

WORKDIR /todo

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /todo

COPY --from=builder /todo/target/todo-0.0.1-SNAPSHOT.jar todo.jar

CMD ["java", "-jar", "todo.jar"]

EXPOSE 8080
