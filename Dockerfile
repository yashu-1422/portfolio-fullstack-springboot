# Stage 1: Use a Maven image that supports Java 21 to build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project file and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of your source code
COPY src ./src

# Build the application, creating the executable .jar file.
RUN mvn package -DskipTests


# Stage 2: Use a lightweight Java 21 image to run the application
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the .jar file that was created in the 'build' stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port that the application will run on
EXPOSE 8081

# The command to run your application when the container starts
ENTRYPOINT ["java","-jar","app.jar"]
