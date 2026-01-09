import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Avatar,
  Typography,
  Box,
  Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EmployeeTable = ({ employees, onDelete, onToggle, onEdit }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
      }}
    >
      <Table>
        {/* TABLE HEADER */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f4f8ff"
            }}
          >
            {[
              "ID",
              "Profile",
              "Name",
              "Gender",
              "DOB",
              "State",
              "Status",
              "Actions"
            ].map((head) => (
              <TableCell
                key={head}
                sx={{
                  fontWeight: 600,
                  color: "#1f2937",
                  fontSize: "0.85rem"
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography
                  textAlign="center"
                  color="text.secondary"
                  py={3}
                >
                  No employees found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            employees.map((emp) => (
              <TableRow
                key={emp.id}
                hover
                sx={{
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: "#f9fbff"
                  }
                }}
              >
                <TableCell>{emp.id}</TableCell>

                <TableCell>
                  <Avatar
                    src={emp.image}
                    alt={emp.name}
                    sx={{
                      width: 42,
                      height: 42,
                      border: "2px solid #328adb"
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Typography fontWeight={500}>{emp.name}</Typography>
                </TableCell>

                <TableCell>{emp.gender}</TableCell>
                <TableCell>{emp.dob}</TableCell>
                <TableCell>{emp.state}</TableCell>

                {/* STATUS */}
                <TableCell>
                  <Chip
                    label={emp.active ? "Active" : "Inactive"}
                    size="small"
                    color={emp.active ? "success" : "default"}
                    sx={{ mr: 1 }}
                  />
                  <Switch
                    checked={emp.active}
                    onChange={() => onToggle(emp.id)}
                    color="primary"
                  />
                </TableCell>

                {/* ACTIONS */}
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      onClick={() => onEdit(emp)}
                      sx={{
                        backgroundColor: "#e8f1ff",
                        "&:hover": { backgroundColor: "#d6e8ff" }
                      }}
                    >
                      <EditIcon sx={{ color: "#328adb" }} />
                    </IconButton>

                    <IconButton
                      onClick={() => onDelete(emp.id)}
                      sx={{
                        backgroundColor: "#ffecec",
                        "&:hover": { backgroundColor: "#ffd6d6" }
                      }}
                    >
                      <DeleteIcon sx={{ color: "#d32f2f" }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
