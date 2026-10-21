FOODREACH COMPLETE WEBSITE — ECLIPSE SETUP

This folder combines the main FoodReach Spring Boot + MySQL project and the extra web pages.

Pages:
- index.html: homepage and surplus food report form
- about.html: about page
- login.html: login
- register.html: create account
- available-food.html: searchable food reports
- my-reports.html: basic demo of the signed-in user's reports
- profile.html: profile page

Static files:
- css/style.css
- js/app.js
- js/auth.js
- js/available-food.js
- js/my-reports.js
- js/profile.js

Java backend:
- FoodReachApplication.java
- SecurityConfig.java
- AppUser.java / AppUserRepository.java / AuthController.java
- FoodReport.java / FoodReportRepository.java / FoodReportController.java
- HomeController.java

Before running:
1. Create the MySQL database: CREATE DATABASE IF NOT EXISTS foodreach;
2. Edit src/main/resources/application.properties and replace YOUR_MYSQL_PASSWORD.
3. Import this folder in Eclipse using File > Import > Maven > Existing Maven Projects.
4. Wait for Maven dependencies to resolve, then run FoodReachApplication.java.
5. Open http://localhost:8080/

Security note:
This is a learning project starter. Review and harden security before public deployment.
