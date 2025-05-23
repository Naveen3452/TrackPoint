# TrackPoint

TrackPoint is a full-stack MERN application designed to manage client projects efficiently within an organization. It provides role-based access where admins can create clients, assign projects, and track progress, while clients can view their assigned projects and project status.

## Features

- **User Roles:**  
  - **Admin:** Create clients, manage projects (create, update status, edit description, delete), and view all clients and their projects.  
  - **Client:** View only their own projects with detailed status and description history.

- **Project Management:**  
  - Projects have a title, a history of descriptions with timestamps, and a status that can be updated by admin.  
  - Status options include: In Progress, Completed, Pending, On Hold.  
  - When editing the project description, previous descriptions are saved along with the date for full traceability.

- **Authentication & Authorization:**  
  - Secure JWT-based authentication with role-based route protection.  
  - Only admins can create users and projects or modify them.

- **Data Persistence:**  
  - MongoDB used to store users and projects.  
  - References link projects to their assigned clients using ObjectId.

- **API Endpoints:**  
  - Admin routes to manage clients and projects.  
  - Client routes to view their own projects.  
  - Middleware to protect routes and verify roles.

## Tech Stack

- **Frontend:** To be created (React planned)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Authentication:** JWT (JSON Web Tokens)  
- **Other:** dotenv for environment variables

## How to Run

1. Clone the repository  
2. Navigate to the backend folder: `cd backend`  
3. Install dependencies: `npm install`  
4. Create `.env` file with your MongoDB URI and JWT secret  
5. Start the server: `npm run dev` (using nodemon)  
6. Use Postman or any API client to test endpoints

## Project Status

The backend API is fully functional and tested with Postman. The frontend will be implemented next using React to create a user-friendly dashboard for both admin and client users.

---

**TrackPoint** is a practical project demonstrating skills in building secure and scalable MERN applications with role-based access and dynamic data management — ideal for team collaboration and real-world client project tracking.


