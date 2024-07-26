import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewUser from "./ViewUser";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";

function Mainpage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users~", error);
      });
  };

  const handleViewUser = (id) => {
    setSelectedUserId(id);
    setAction("view");
  };

  const handleEditUser = (id) => {
    setSelectedUserId(id);
    setAction("edit");
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8000/api/users/${id}`)
        .then((response) => {
          console.log("User deleted successfully:", response.data);
          fetchUsers(); // Refresh the user list
        })
        .catch((error) => {
          console.error("There was an error deleting the user:", error);
        });
    }
  };

  const handleAddUser = () => {
    console.log("Add button clicked");
    setAction("add");
  };

  const handleClose = () => {
    setSelectedUserId(null);
    setAction(null);
  };

  const refreshUsers = () => {
    fetchUsers(); // Re-fetch the users
  };

  return (
    <div>
      {!selectedUserId && action === null ? (
        <div className="container">
          <h2 className="text-center">
            CRUD System with Express JS & React JS
          </h2>
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={handleAddUser}
          >
            Add User
          </button>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Job Title</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.job_title}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => handleViewUser(user.id)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={() => handleEditUser(user.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : action === "view" ? (
        <ViewUser userId={selectedUserId} onClose={handleClose} />
      ) : action === "edit" ? (
        <UpdateUser
          userId={selectedUserId}
          onClose={handleClose}
          onUpdate={refreshUsers}
        />
      ) : action === "add" ? (
        <AddUser onClose={handleClose} onAdd={refreshUsers} />
      ) : null}
    </div>
  );
}

export default Mainpage;
