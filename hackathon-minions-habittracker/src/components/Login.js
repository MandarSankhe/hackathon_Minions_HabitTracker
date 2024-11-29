import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import bcrypt from "bcryptjs";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    try {
      const usersData = JSON.parse(localStorage.getItem("users")) || [];
      const user = usersData.find((u) => u.username === formData.username);

      if (user && bcrypt.compareSync(formData.password, user.password)) {
        setMessage("Login successful!");
        navigate("/home"); // Redirect to Home
      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      setMessage("Error reading user data.");
    }
  };

  const handleRegister = () => {
    try {
      const usersData = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = usersData.some((user) => user.username === formData.username);

      if (userExists) {
        setMessage("Username already exists. Please choose another.");
        return;
      }

      // Hash the password before saving
      const hashedPassword = bcrypt.hashSync(formData.password, 10);

      usersData.push({ username: formData.username, password: hashedPassword });
      localStorage.setItem("users", JSON.stringify(usersData));
      setMessage("Registration successful! You can now log in.");
    } catch (error) {
      setMessage("Error saving user data.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Login Card */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Login</h3>
              <input
                type="text"
                name="username"
                className="form-control my-2"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                className="form-control my-2"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Register Card */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Register</h3>
              <input
                type="text"
                name="username"
                className="form-control my-2"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                className="form-control my-2"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button className="btn btn-success" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
