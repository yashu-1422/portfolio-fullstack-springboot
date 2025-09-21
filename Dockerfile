# Stage 1: Use an official Maven image to build the application
# This creates a temporary container just for building your .jar file.
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project file and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of your source code
COPY src ./src

# Build the application, creating the executable .jar file.
# The -DskipTests flag is used to speed up the build process during deployment.
RUN mvn package -DskipTests


# Stage 2: Use a lightweight Java image to run the application
# This creates the final, small container for your live application.
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the .jar file that was created in the 'build' stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port that the application will run on
EXPOSE 8081

# The command to run your application when the container starts
ENTRYPOINT ["java","-jar","app.jar"]
```

---
### **Step 2: Push the `Dockerfile` to GitHub**

Render needs this new `Dockerfile` to build your project. You must add it to your GitHub repository.

**Action:**
1.  Open a terminal or command prompt in your project's root folder.
2.  Run the following commands to add, commit, and push your new file:
    ```bash
    git add Dockerfile
    git commit -m "feat: Add Dockerfile for deployment"
    git push
    
