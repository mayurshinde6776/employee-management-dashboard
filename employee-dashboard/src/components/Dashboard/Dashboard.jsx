import React, { useState, useRef } from "react";
import SummaryCards from "./SummaryCards";
import EmployeeTable from "./EmployeeTable";
import Filters from "./Filters";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Dashboard = () => {
    const { logout } = useAuth();
const navigate = useNavigate();
const printRef = useRef();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      gender: "Male",
      dob: "1995-06-15",
      state: "Maharashtra",
      active: true,
      image: "https://via.placeholder.com/40"
    },
    {
      id: 2,
      name: "Priya Verma",
      gender: "Female",
      dob: "1998-02-10",
      state: "Gujarat",
      active: false,
      image: "https://via.placeholder.com/40"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 🔍 Combined filtering
  const filteredEmployees = employees
    .filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(emp =>
      genderFilter ? emp.gender === genderFilter : true
    )
    .filter(emp =>
      statusFilter
        ? statusFilter === "active"
          ? emp.active
          : !emp.active
        : true
    );

  //  Add employee
  const handleAddEmployee = (data) => {
    setEmployees([...employees, { ...data, id: Date.now() }]);
  };

  // Edit button click
  const handleEditClick = (employee) => {
    setEditEmployee(employee);
    setShowForm(true);
  };

  //  Update employee
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map(emp =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setEditEmployee(null);
  };

  //  Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  //  Toggle active/inactive
  const toggleStatus = (id) => {
    setEmployees(
      employees.map(emp =>
        emp.id === id ? { ...emp, active: !emp.active } : emp
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Employee Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <SummaryCards employees={employees} />

      <button onClick={() => {
        setEditEmployee(null);
        setShowForm(true);
      }}>
        Add Employee
      </button>
<button onClick={() => window.print()}>
  Print Employees
</button>

      {showForm && (
        <EmployeeForm
          onSubmit={editEmployee ? handleUpdateEmployee : handleAddEmployee}
          editEmployee={editEmployee}
          onClose={() => {
            setShowForm(false);
            setEditEmployee(null);
          }}
        />
      )}

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

     <div ref={printRef} className="print-section">
  <EmployeeTable
    employees={filteredEmployees}
    onDelete={handleDelete}
    onToggle={toggleStatus}
    onEdit={handleEditClick}
  />
</div>

    </div>
  );
};

export default Dashboard;
