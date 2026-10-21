FOODREACH FULL PROJECT — SETUP FOR ECLIPSE ON MAC

IMPORTANT
This is a learning-project starter. It contains login/register pages, a food-report page,
Spring Boot APIs, MySQL persistence, and BCrypt password hashing. Before any public launch,
add CSRF protection, rate limiting, email verification/password recovery, stronger authorization,
and a security review. Do not publish your database password.

1. DATABASE
Open MySQL Workbench and run:
CREATE DATABASE IF NOT EXISTS foodreach;

2. DATABASE PASSWORD
Open src/main/resources/application.properties.
Replace YOUR_MYSQL_PASSWORD with your local MySQL password.
Do not include angle brackets or quote marks unless your password itself requires them.

3. OPEN IN ECLIPSE
Recommended easiest option:
- Extract FoodReach_Full_Project.zip.
- Eclipse: File > Import > Maven > Existing Maven Projects.
- Browse to the extracted FoodReach_Full_Project folder.
- Select the pom.xml project and click Finish.
- Wait for Maven dependencies to finish downloading.

If you already have a FoodReach Maven project:
- Back up your existing project first.
- Copy/merge the files and folders in this archive into your project.
- Replace duplicate files only after backing them up.
- Ensure you have only one HomeController mapping GET / and one FoodReportController.
- In Eclipse, right-click project > Maven > Update Project, then Project > Clean.

4. RUN
Open src/main/java/foodreach/FoodReachApplication.java.
Right-click > Run As > Java Application (or Spring Boot App).
Wait for the Console to show that Tomcat started on port 8080.

5. OPEN IN SAFARI
Home:     http://localhost:8080/
Login:    http://localhost:8080/login.html
Register: http://localhost:8080/register.html
Food API: http://localhost:8080/api/food-reports

6. TEST
- Open Register and create an account using a real email format and a password of 8+ characters.
- Open Login and sign in with the same details.
- Return to Home, fill in the food form and submit it.
- Refresh Available Food Reports.
- In MySQL Workbench, check:
  SELECT id, full_name, email, role FROM app_users;
  SELECT id, food_name, quantity_kg, provider_type, pickup_address FROM food_reports;

TROUBLESHOOTING
- Whitelabel 404: verify index.html is under src/main/resources/static/index.html.
- Port already in use: stop the previous run from Eclipse Console (red Terminate button), then run again.
- MySQL access denied: update the password in application.properties.
- Maven dependency errors: right-click project > Maven > Update Project, check internet connection.
- If your current project already has a different package structure, don't mix duplicate controllers.
