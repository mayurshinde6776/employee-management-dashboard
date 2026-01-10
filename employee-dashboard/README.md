# Employee Management Dashboard (React.js)

##  Project Overview
The Employee Management Dashboard is a React.js application that allows users to manage employee records with authentication.  
It includes features such as login/logout, employee CRUD operations, search & filtering, status management, and printing employee data.

This project is built as part of a React.js assignment focusing on component structure, state management, UI/UX, and basic authentication.

---

##  Features

###  Authentication
- Login page with mock authentication
- Protected dashboard route
- Logout functionality
- Dashboard access restricted without login

###  Dashboard Summary
- Total number of employees
- Active vs Inactive employee count

###  Employee Management
- Add new employee
- Edit existing employee
- Delete employee (with confirmation)
- Toggle Active / Inactive status
- Print employee list

###  Employee Form
- Full Name
- Gender
- Date of Birth
- State (Dropdown)
- Profile Image upload with preview
- Active / Inactive status
- Form validation
- Reusable form for Add & Edit

###  Search & Filters
- Search employees by name
- Filter by gender
- Filter by active/inactive status
- Combined filtering supported

###  Print
- Print employee list using browser print

###  UI / UX
- Clean and modern layout
- Proper spacing and typography
- Empty states handled
- Responsive and readable design

---

##  Tech Stack

- React.js
- React Router DOM
- Context API (Authentication)
- JavaScript (ES6+)
- Vite
- CSS

---

##  Folder Structure

src/
│
├── components/
│ ├── auth/
│ │ └── Login.jsx
│ │
│ ├── Dashboard/
│ │ ├── Dashboard.jsx
│ │ ├── SummaryCards.jsx
│ │ ├── EmployeeTable.jsx
│ │ └── Filters.jsx
│ │
│ └── EmployeeForm/
│ └── EmployeeForm.jsx
│
├── context/
│ └── AuthContext.jsx
│
├── routes/
│ └── ProtectedRoute.jsx
│
├── App.jsx
├── main.jsx
└── index.css


---

##  How to Run the Project Locally

###  Clone the repository
```bash
git clone <https://github.com/mayurshinde6776/employee-management-dashboard.git >

cd employee-management-dashboard

 1 Install dependencies
npm install

 2 Start development server
npm run dev

3 Open in browser
http://localhost:5173

4 Login Credentials (Mock)

Email: admin@example.com
Password: admin123