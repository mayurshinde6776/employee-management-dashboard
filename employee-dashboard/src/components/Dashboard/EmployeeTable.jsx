const EmployeeTable = ({ employees, onDelete, onToggle, onEdit }) => {
  return (
    <table border="1" width="100%" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Profile</th>
          <th>Name</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>State</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="8" align="center">No employees found</td>
          </tr>
        ) : (
          employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td><img src={emp.image} alt="" /></td>
              <td>{emp.name}</td>
              <td>{emp.gender}</td>
              <td>{emp.dob}</td>
              <td>{emp.state}</td>
              <td>
                <input
                  type="checkbox"
                  checked={emp.active}
                  onChange={() => onToggle(emp.id)}
                />
              </td>
              <td>
                <button onClick={() => onEdit(emp)}>Edit</button>{" "}
                <button onClick={() => onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
