# Employee Management System

A full-stack employee management application with role-based access, employee CRUD, dashboard analytics, and JWT authentication.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-supported-3166f6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.19-skyblue)

---

## Overview

This project is a professional employee management system built with a React frontend and an Express backend. It allows organizations to manage employees, roles, departments, and dashboard metrics in a centralized interface.

- What it does: Provides employee registration, login, profile management, employee listing, department filtering, and dashboard analytics.
- Why it was built: To simplify workforce administration with an easy-to-use interface and secure API.
- Problem it solves: Reduces manual employee tracking, improves role-based access control, and enables HR teams to monitor employee data from one system.
- Main use cases:
  - Admin user management
  - Manager employee oversight
  - Employee self-service profile updates
  - Analytics and department distribution overview
- Target users: HR administrators, operations managers, and company employees.

---

## Features

- JWT authentication and protected routes
- Employee registration and login
- Password change endpoint
- Role-based authorization (`admin`, `manager`, `employee`)
- Employee CRUD operations
- Search and filter employees by department/status
- Dashboard metrics and recent hires overview
- React Router protected frontend routes
- PostgreSQL database using Sequelize
- Security middleware: CORS, Helmet, rate limiting
- Demo seeding utilities for admin, manager, and employee accounts

---

## Screenshots

> No screenshot assets were found in the repository. Add screenshots here once available.

- Home Page
- Dashboard
- Login
- Admin Panel
- Mobile View

---

## Tech Stack

| Category       | Technology           |
| -------------- | -------------------- |
| Frontend       | React.js             |
| Backend        | Node.js + Express    |
| Database       | PostgreSQL           |
| ORM            | Sequelize            |
| Styling        | Tailwind CSS         |
| HTTP Client    | Axios                |
| Authentication | JWT                  |
| Validation     | express-validator    |
| Notifications  | react-hot-toast      |
| Charts         | Recharts             |

---

## Folder Structure

```
Employee-Management-System/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── dashboardController.js
│   │   │   └── employeeController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── validationMiddleware.js
│   │   ├── models/
│   │   │   └── Employee.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   └── employeeRoutes.js
│   │   └── utils/
│   │       └── generateToken.js
│   ├── init-db.js
│   ├── seed-employees.js
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── common/
    │   │   │   ├── Header.jsx
    │   │   │   ├── LoadingSpinner.jsx
    │   │   │   └── Sidebar.jsx
    │   │   ├── dashboard/
    │   │   │   ├── DepartmentChart.jsx
    │   │   │   ├── RecentHires.jsx
    │   │   │   └── StatsCards.jsx
    │   │   └── employees/
    │   │       ├── DeleteModal.jsx
    │   │       ├── EmployeeDetails.jsx
    │   │       ├── EmployeeForm.jsx
    │   │       └── EmployeeList.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useDebounce.js
    │   ├── pages/
    │   │   ├── AddEmployeePage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── EditEmployeePage.jsx
    │   │   ├── EmployeeDetailsPage.jsx
    │   │   ├── EmployeeListPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── NotFoundPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   └── RegisterPage.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── dashboardService.js
    │   │   └── employeeService.js
    │   ├── utils/
    │   │   ├── constants.js
    │   │   └── formatters.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── index.js
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
```

---

## Installation

### Backend

```bash
cd Employee-Management-System/backend
npm install
```

### Frontend

```bash
cd Employee-Management-System/Frontend
npm install
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5001
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=5432
JWT_SECRET=
JWT_EXPIRE=30d
NODE_ENV=development
```

- `PORT`: Backend server port.
- `DB_NAME`: PostgreSQL database name.
- `DB_USER`: PostgreSQL username.
- `DB_PASSWORD`: PostgreSQL password.
- `DB_HOST`: PostgreSQL host address.
- `DB_PORT`: PostgreSQL port.
- `JWT_SECRET`: Secret used to sign JWT tokens.
- `JWT_EXPIRE`: JWT expiration duration.
- `NODE_ENV`: Application environment.

### Frontend (`Frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:5001/api/v1
```

- `REACT_APP_API_URL`: Base API endpoint for the React app.

---

## Running the Project

### Backend

```bash
cd Employee-Management-System/backend
npm run dev
```

- `npm run dev`: Starts the backend with `nodemon`.
- `npm start`: Runs the backend with Node.

### Frontend

```bash
cd Employee-Management-System/Frontend
npm start
```

- `npm start`: Launches the React development server.
- `npm run build`: Builds the frontend for production.

---

## API Documentation

### Authentication

#### POST `/api/v1/auth/register`

- Description: Register a new employee.
- Request body: `username`, `email`, `password`, `confirmPassword`, `role`, `firstName`, `lastName`, `phone`, `department`, `position`
- Response: `token`, `user`
- Authentication: No

#### POST `/api/v1/auth/login`

- Description: Login with email or username and password.
- Request body: `email`, `password`
- Response: `token`, `user`
- Authentication: No

#### POST `/api/v1/auth/change-password`

- Description: Change current user password.
- Request body: `currentPassword`, `newPassword`
- Authentication: Yes

#### GET `/api/v1/auth/me`

- Description: Get current authenticated user.
- Authentication: Yes

#### GET `/api/v1/auth/debug-users`

- Description: Debug route for development/testing.
- Authentication: No

### Employee Management

#### GET `/api/v1/employees`

- Description: Retrieve employees.
- Query params: `search`, `department`, `status`
- Authentication: Yes
- Roles: `admin`, `manager`, `employee`

#### GET `/api/v1/employees/department/:dept`

- Description: Get active employees by department.
- Authentication: Yes

#### GET `/api/v1/employees/:id`

- Description: Get employee details by ID.
- Authentication: Yes

#### POST `/api/v1/employees`

- Description: Create employee record.
- Authentication: Yes
- Roles: `admin`

#### PUT `/api/v1/employees/:id`

- Description: Update employee.
- Authentication: Yes

#### DELETE `/api/v1/employees/:id`

- Description: Delete an employee.
- Authentication: Yes
- Roles: `admin`

### Dashboard

#### GET `/api/v1/dashboard/stats`

- Description: Get dashboard metrics.
- Authentication: Yes
- Roles: `admin`, `manager`

#### GET `/api/v1/dashboard/department-distribution`

- Description: Get employee distribution by department.
- Authentication: Yes
- Roles: `admin`, `manager`

#### GET `/api/v1/dashboard/recent-employees`

- Description: Get latest employees.
- Query params: `limit`
- Authentication: Yes
- Roles: `admin`, `manager`

---

## Authentication Flow

- Users login via email/username and password.
- Backend issues a JWT token.
- Frontend stores `token` and `user` in localStorage.
- Protected routes require a valid JWT.
- Role-based authorization is enforced on backend routes.

---

## Database

- Database: PostgreSQL
- ORM: Sequelize

### Employee model

Fields include:
- `id`, `username`, `email`, `password_hash`, `role`, `first_name`, `last_name`
- `phone`, `employee_id`, `department`, `position`, `hire_date`, `salary`
- `address`, `city`, `state`, `zip_code`, `country`, `is_active`, `last_login`

---

## Architecture

React Frontend
↓
Express Server
↓
REST API
↓
PostgreSQL Database

---

## Third-Party Libraries

### Backend
- `express`: Web server
- `bcryptjs`: Password hashing
- `cors`: Cross-origin requests
- `dotenv`: Env variables
- `express-rate-limit`: Rate limiting
- `express-validator`: Input validation
- `helmet`: Security headers
- `jsonwebtoken`: JWT handling
- `morgan`: Logging
- `pg`, `pg-hstore`: PostgreSQL driver
- `sequelize`: ORM

### Frontend
- `react`: UI library
- `react-dom`: React DOM renderer
- `react-router-dom`: Routing
- `axios`: API client
- `react-hook-form`: Forms handling
- `react-hot-toast`: Notifications
- `react-icons`: Icons
- `recharts`: Charts
- `date-fns`: Date utilities
- `tailwindcss`: Styling

---

## Deployment

- Configure backend `.env` with PostgreSQL and JWT settings.
- Configure frontend `.env` with `REACT_APP_API_URL`.
- Install dependencies in both `backend` and `Frontend`.
- Start backend and frontend separately.
- For production, build frontend and serve from a static host or integrate with backend.

---

## Future Improvements

- Add frontend role-based route access checks.
- Hash passwords for admin-created employees.
- Add pagination to employee lists.
- Add employee avatar uploads.
- Add email verification and password reset.
- Add unit and e2e tests.
- Improve dashboard charts and visuals.

---

## Known Limitations

- Some employee creation logic stores raw password input in `password_hash`.
- Frontend route protection only checks token presence.
- No screenshot assets are included.
- Repository does not include an explicit license file.

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Install dependencies.
4. Make your changes.
5. Create a pull request.

---

## License

To be configured.

---

## Author

- Name: To be configured
- GitHub: `@your-username`
- LinkedIn: `linkedin.com/in/your-profile`
- Email: `your.email@example.com`

---

## Acknowledgements

- Express.js
- React
- Sequelize
- PostgreSQL
- Tailwind CSS
- React Router
- React Hot Toast
