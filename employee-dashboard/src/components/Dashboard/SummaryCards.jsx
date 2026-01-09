import React from "react";

const SummaryCards = ({ employees }) => {
  const total = employees.length;
  const active = employees.filter(emp => emp.active).length;
  const inactive = total - active;

  const summaryData = [
    { title: "Total Employees", value: total, bgColor: "linear-gradient(135deg, #6a11cb, #2575fc)" },
    { title: "Active", value: active, bgColor: "linear-gradient(135deg, #56ab2f, #a8e063)" },
    { title: "Inactive", value: inactive, bgColor: "linear-gradient(135deg, #ff416c, #ff4b2b)" }
  ];

  return (
    <div style={containerStyle}>
      {summaryData.map((card, index) => (
        <div
          key={index}
          style={{ ...cardStyle, background: card.bgColor, color: "#fff" }}
        >
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

const containerStyle = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "20px",
  justifyContent: "center",
};

const cardStyle = {
  padding: "20px",
  borderRadius: "12px",
  minWidth: "150px",
  width: "200px",
  flex: "1 1 auto",
  textAlign: "center",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  fontWeight: "bold",
  // Hover effect
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.3)"
  }
};

export default SummaryCards;
