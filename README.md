# Job pplication Tracker Project

==========================
 Job Application Tracker
==========================

🎯 Project Overview:
A full-stack Job Application Tracker that allows users to log job applications, update their status, and manage interactions throughout the job search process. Supports both custom login and OAuth (Google, GitHub).

🛠 Tech Stack:
Frontend:
- React.js
- Tailwind CSS
- Axios
- React Router
- Framer Motion (animations)

Backend:
- Spring Boot
- Spring Security (JWT + OAuth2)
- Spring Data JPA
- Oracle DB
- Redis (session management, token blacklisting)
- Swagger/OpenAPI

DevOps/Infra:
- Docker
- Docker Compose
- GitHub Actions
- Heroku or EC2 for hosting

📊 Database:
- Table 1: jat_users (login, profile info)
- Table 2: jat_jobs (job entries per user)
- Redis: token/session caching

🔁 Application Flow:
1. User lands on Login Page (OAuth or app login)
2. On login, JWT is issued and stored
3. User is redirected to Dashboard:
   - Profile details
   - Last 3 applications
4. User can view full application history (paginated)
5. User can add a new job application
6. User can view/update a specific application (popup)

👤 User Interaction:
- Login > Home > Applications > Add/View/Edit > Logout

![alt text](final_ui_all_screens.png)