import React, { useState } from "react";
//import "./Login.css"; // Optional: for styling Login component

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    // Simulate authentication using a static user
    const storedUsers = [
      { username: "user1", password: "pass1" },
      { username: "user2", password: "pass2" },
    ];

    const userExists = storedUsers.some(
      (user) =>
        user.username === formData.username && user.password === formData.password
    );

    if (userExists) {
      setMessage("Login successful!");
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="form-group">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
