import React, { useState, useRef } from "react";
import SummaryCards from "./SummaryCards";
import EmployeeTable from "./EmployeeTable";
import Filters from "./Filters";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    Container,
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialog from "../../utils/ConfirmDialog";

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const printRef = useRef();

    const [employees, setEmployees] = useState([
        {
            id: 1768056112101,
            name: "Rahul Sharma",
            gender: "Male",
            dob: "1995-06-15",
            state: "Maharashtra",
            active: true,
            image: "https://via.placeholder.com/40"
        },
        {
            id: 1768056112103,
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

    // Delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Logout dialog
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const filteredEmployees = employees
        .filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(emp => (genderFilter ? emp.gender === genderFilter : true))
        .filter(emp =>
            statusFilter
                ? statusFilter === "active"
                    ? emp.active
                    : !emp.active
                : true
        );

    const handleAddEmployee = data => {
        setEmployees([...employees, { ...data, id: Date.now() }]);
    };

    const handleEditClick = employee => {
        setEditEmployee(employee);
        setShowForm(true);
    };

    const handleUpdateEmployee = updatedEmployee => {
        setEmployees(
            employees.map(emp =>
                emp.id === updatedEmployee.id ? updatedEmployee : emp
            )
        );
        setEditEmployee(null);
    };

    const handleDeleteClick = id => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

// Confirm delete
    const handleConfirmDelete = () => {
        setEmployees(employees.filter(emp => emp.id !== deleteId));
        setDeleteDialogOpen(false);
        setDeleteId(null);
    };

    // Cancel delete
    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setDeleteId(null);
    };

    // Toggle active status
    const toggleStatus = id => {
        setEmployees(
            employees.map(emp =>
                emp.id === id ? { ...emp, active: !emp.active } : emp
            )
        );
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "#328adb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                            component="img"
                            src="/bookxpert_pvt_ltd_logo.jpg"
                            alt="Logo"
                            sx={{ width: 40, height: 40, objectFit: "contain" }}
                        />
                        <Typography variant="h6">Employee Dashboard</Typography>
                    </Box>

                    {/* Logout button */}

                    <Button
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        onClick={() => setLogoutDialogOpen(true)} // open logout dialog
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ pt: 10, pb: 3 }}>
                {/* Summary Cards */}
                <SummaryCards employees={employees} />

                {/* Actions */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 2,
                        justifyContent: { xs: "center", sm: "flex-start" }
                    }}
                >
                    {/* Add Employee */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setEditEmployee(null);
                            setShowForm(true);
                        }}
                        sx={{
                            backgroundColor: "#328adb",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            "&:hover": {
                                backgroundColor: "#2874c7"
                            }
                        }}
                    >
                        Add Employee
                    </Button>

                    {/* Print */}
                    <Button
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        onClick={() => window.print()}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "#328adb",
                            color: "#328adb",
                            "&:hover": {
                                borderColor: "#2874c7",
                                backgroundColor: "#f1f7ff"
                            }
                        }}
                    >
                        Print Employees
                    </Button>
                </Box>


                {/* Employee Form */}
                <EmployeeForm
                    open={showForm}
                    onSubmit={editEmployee ? handleUpdateEmployee : handleAddEmployee}
                    editEmployee={editEmployee}
                    onClose={() => {
                        setShowForm(false);
                        setEditEmployee(null);
                    }}
                />

                {/* Filters */}
                <Filters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    genderFilter={genderFilter}
                    setGenderFilter={setGenderFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

                {/* Employee Table */}
                <Box ref={printRef}>
                    <EmployeeTable
                        employees={filteredEmployees}
                        onDelete={handleDeleteClick}
                        onToggle={toggleStatus}
                        onEdit={handleEditClick}
                    />
                </Box>
            </Container>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 2,
                    mt: 4,
                    textAlign: "center",
                    backgroundColor: "#f5f5f5",
                    borderTop: "1px solid #ddd"
                }}
            >
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} BookXpert Pvt Ltd. All rights
                    reserved.
                </Typography>
            </Box>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={deleteDialogOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this employee?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText="Delete"
                confirmColor="error"
            />

            <ConfirmDialog
                open={logoutDialogOpen}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
                onConfirm={handleLogout}
                onCancel={() => setLogoutDialogOpen(false)}
                confirmText="Logout"
                confirmColor="warning"
            />

        </>
    );
};

export default Dashboard;
