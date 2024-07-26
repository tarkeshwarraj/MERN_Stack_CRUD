import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateUser = ({ userId, onClose, onUpdate }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    job_title: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/users/${userId}`)
        .then((response) => {
          setUser(response.data);
          setFormData({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            gender: response.data.gender,
            job_title: response.data.job_title,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the user details:", error);
          setLoading(false);
        });
    }
  }, [userId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(`http://localhost:8000/api/users/${userId}`, formData)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        onUpdate(); //Triger the update callback
        onClose(); // Close the update form and return to the main page
      })
      .catch((error) => {
        console.error("There was an error updating the user:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-header">
          <h5>Update User</h5>
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "updating..." : "Update"}
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

export default UpdateUser;
