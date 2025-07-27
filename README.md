# Job Application Tracker Project

Project Overview:
A full-stack Job Application Tracker that allows users to log job applications, update their status, and manage interactions throughout the job search process. Supports both custom login and OAuth (Google, GitHub).

Tech Stack:
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
  

Database:
- Table 1: jat_users (login, profile info)
- Table 2: jat_jobs (job entries per user)
- Redis: token/session caching

Application Flow:
1. User lands on Login Page (OAuth or app login)
2. On login, JWT is issued and stored
3. User is redirected to Dashboard:
   - Profile details
   - Last 3 applications
4. User can view full application history (paginated)
5. User can add a new job application
6. User can view/update a specific application (popup)

User Interaction:
- Login > Home > Applications > Add/View/Edit > Logout

Steps: First create databses from the db folder add test data.
       Second run backend . Then once backend is fully running run frontend application will open in port 3000.
