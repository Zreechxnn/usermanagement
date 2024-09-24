"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [editingUser, setEditingUser] = useState(null); 
  const [showAll, setShowAll] = useState(false); 
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(editingUser.id);
    } else {
      await addUser();
    }
    setName("");
    setEmail("");
    setEditingUser(null);
    fetchUsers();
  };

  const addUser = async () => {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
  };

  const updateUser = async (id) => {
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, email }),
    });
  };

  const deleteUser = async (id) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const toggleShowAllUsers = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
      </form>

      <h2>Users List</h2>
      <button onClick={toggleShowAllUsers} className="show-all-btn">
        {showAll ? "Hide All Users" : "Show All Users"}
      </button>

      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            {showAll && (
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
                <div className="button-group">
                  <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteUser(user.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
