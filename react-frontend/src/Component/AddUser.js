import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    job_title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users", formData)
      .then((response) => {
        console.log("User added successfully:", response.data);
        onAdd(); // Refresh the user list
        onClose(); // Close the form
      })
      .catch((error) => {
        console.error("There was an error adding the user:", error);
      });
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-header">
          <h5>Add User</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <input
                type="text"
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
