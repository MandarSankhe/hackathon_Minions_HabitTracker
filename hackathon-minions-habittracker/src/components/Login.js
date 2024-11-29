import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import bcrypt from "bcryptjs";
import "./Login.css"; // Import the CSS file
import minionsImage from "../assets/minions.png"; // Importing local image

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", password: "", userType: "Customer" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLogin = () => {
    try {
      const usersData = JSON.parse(localStorage.getItem("users")) || [];
      const user = usersData.find((u) => u.username === formData.username);

      if (user && bcrypt.compareSync(formData.password, user.password)) {
        setMessage("Login successful!");
        navigate("/habit"); // Redirect to Home
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
      const userExists = usersData.some((user) => user.username === registerData.username);

      if (userExists) {
        setMessage("Username already exists. Please choose another.");
        return;
      }

      // Hash the password before saving
      const hashedPassword = bcrypt.hashSync(registerData.password, 10);

      usersData.push({ username: registerData.username, password: hashedPassword, userType: registerData.userType });
      localStorage.setItem("users", JSON.stringify(usersData));
      setMessage("Registration successful! You can now log in.");
    } catch (error) {
      setMessage("Error saving user data.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src={minionsImage} alt="Minions" className="minions-img" />
      </div>
      <div className="row justify-content-center">
        {/* Login Card */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0">
            <div className="card-header text-center bg-primary text-white">
              <h3 className="card-title mb-0">Login</h3>
            </div>
            <div className="card-body">
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
              <button className="btn btn-primary w-100" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Register Card */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0">
            <div className="card-header text-center bg-primary text-white">
              <h3 className="card-title mb-0">Register</h3>
            </div>
            <div className="card-body">
              <input
                type="text"
                name="username"
                className="form-control my-2"
                placeholder="Username"
                value={registerData.username}
                onChange={handleRegisterInputChange}
              />
              <input
                type="password"
                name="password"
                className="form-control my-2"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterInputChange}
              />
              <button className="btn btn-success w-100" onClick={handleRegister}>
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
