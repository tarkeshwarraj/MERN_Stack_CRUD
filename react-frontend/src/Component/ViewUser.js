import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewUser({ userId, onClose }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the user details:", error);
        });
    }
  }, [userId]);

  if (!user) return null;

  return (
    <div className="container">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h5 className="modal-title">User Details</h5>
          </div>
          <div className="modal-body">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>First Name:</strong> {user.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {user.last_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Job Title:</strong> {user.job_title}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
