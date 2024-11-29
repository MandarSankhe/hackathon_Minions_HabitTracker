import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HabitTracker from './components/HabitTracker';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/habit" element={<HabitTracker />} /> 
      </Routes>
    </Router>
  );
};

export default App;
