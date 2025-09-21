
# Full-Stack Dynamic Personal Portfolio 🚀

This is a complete **full-stack web application** that serves as a **dynamic personal portfolio**.  
It is built with a **Spring Boot backend**, **MySQL database**, and a **vanilla JavaScript frontend**.  

The portfolio acts as a **single source of truth** for showcasing professional projects, experience, and achievements, with all content dynamically managed through the backend.

👉 **Live Demo:** [https://yash-auti-portfolio-fullstack-springboot.onrender.com](https://yash-auti-portfolio-fullstack-springboot.onrender.com)  



## ✨ Features

- **Dynamic Content** – All sections (Projects, Achievements, and Experience) are fetched from a MySQL database via a RESTful API. Content can be updated in the database without any code changes.  
- **RESTful API Backend** – A robust backend built with Spring Boot provides all the necessary data to the frontend, served as JSON.  
- **Clean Architecture** – Backend follows Controller-Service-Repository pattern for better maintainability.  
- **Project Pagination** – Projects section has a "Load More" button that fetches projects in batches, improving page load performance.  
- **Static File Serving** – Spring Boot serves the frontend (HTML, CSS, JS, resume PDFs, images, etc.) directly.  

---

## 🛠 Tech Stack

### Backend
- Java 21  
- Spring Boot  
- Spring Data JPA  
- MySQL  

### Frontend
- HTML, CSS, Vanilla JavaScript  

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### ✅ Prerequisites

You will need the following installed on your machine:

- JDK 21 or later  
- Apache Maven  
- MySQL Server  
- An IDE (IntelliJ IDEA or Eclipse recommended)  



### ⚙️ Installation & Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yashu-1422/portfolio-fullstack-springboot.git
   cd portfolio-fullstack-springboot


2. **Set up the Database**

   * Create a new MySQL database:

     ```sql
     CREATE DATABASE portfolio_db;
     ```
   * Run the provided SQL scripts to create the necessary tables (`projects`, `achievements`, `experience`) and populate them with your data.

3. **Configure the Backend**

   * Go to `src/main/resources/`
   * Create a new file named `application.properties`
   * Add the following configuration (replace placeholders with your credentials):

     ```properties
     # Server Port
     server.port=8081

     # MySQL Database Connection
     spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
     spring.datasource.username=YOUR_MYSQL_USERNAME
     spring.datasource.password=YOUR_MYSQL_PASSWORD

     # JPA & Hibernate Settings
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     ```

   ⚠️ Note: This file is in `.gitignore` and is **not uploaded to GitHub** for security reasons.

4. **Run the Backend Application**

   * From IDE: Run the main class `YashAutiApplication.java`
   * Or from terminal:

     ```bash
     mvn clean package
     java -jar target/YashAuti-0.0.1-SNAPSHOT.jar
     ```

---

## 📬 Contact

**Author:** Yash Auti
📧 Email: [yashauti5@gmail.com](mailto:yashauti5@gmail.com)
🔗 GitHub Repo: [https://github.com/yashu-1422/portfolio-fullstack-springboot](https://github.com/yashu-1422/portfolio-fullstack-springboot)

---

```
```
