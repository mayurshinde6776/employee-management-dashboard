import React from "react";

const SummaryCards = ({ employees }) => {
  const total = employees.length;
  const active = employees.filter(emp => emp.active).length;
  const inactive = total - active;

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div style={cardStyle}>
        <h3>Total Employees</h3>
        <p>{total}</p>
      </div>

      <div style={cardStyle}>
        <h3>Active</h3>
        <p>{active}</p>
      </div>

      <div style={cardStyle}>
        <h3>Inactive</h3>
        <p>{inactive}</p>
      </div>
    </div>
  );
};

const cardStyle = {
  padding: "15px",
  background: "#f5f5f5",
  borderRadius: "8px",
  width: "200px",
  textAlign: "center"
};

export default SummaryCards;
