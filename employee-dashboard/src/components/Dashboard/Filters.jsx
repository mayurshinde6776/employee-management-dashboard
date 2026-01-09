import React from "react";

const Filters = ({
  searchTerm,
  setSearchTerm,
  genderFilter,
  setGenderFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div style={containerStyle}>
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={inputStyle}
      />

      {/* Gender Filter */}
      <select
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
        style={inputStyle}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={inputStyle}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "15px"
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

export default Filters;
