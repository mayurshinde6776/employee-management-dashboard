import React, { useEffect, useState } from "react";

const initialFormState = {
  name: "",
  gender: "",
  dob: "",
  state: "",
  active: true,
  image: ""
};

const EmployeeForm = ({ onSubmit, onClose, editEmployee }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  // Prefill form in Edit mode
  useEffect(() => {
    if (editEmployee) {
      setFormData(editEmployee);
      setPreview(editEmployee.image);
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setFormData({ ...formData, image: imageUrl });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "DOB is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({ ...formData, id: editEmployee?.id || Date.now() });
    onClose();
  };

  return (
    <div style={modalStyle}>
      <h3>{editEmployee ? "Edit Employee" : "Add Employee"}</h3>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        {/* Gender */}
        <div>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p style={errorStyle}>{errors.gender}</p>}
        </div>

        {/* DOB */}
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <p style={errorStyle}>{errors.dob}</p>}
        </div>

        {/* State */}
        <div>
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi">Delhi</option>
          </select>
          {errors.state && <p style={errorStyle}>{errors.state}</p>}
        </div>

        {/* Image */}
        <div>
          <label>Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: "80px", marginTop: "10px" }}
            />
          )}
        </div>

        {/* Active */}
        <div>
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "15px" }}>
          <button type="submit">
            {editEmployee ? "Update" : "Add"}
          </button>
          <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const modalStyle = {
  padding: "20px",
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

const errorStyle = {
  color: "red",
  fontSize: "12px"
};

export default EmployeeForm;
