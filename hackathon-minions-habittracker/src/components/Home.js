import React, { useState, useEffect } from 'react';
import './App.css';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'; // Added ArcElement for doughnut/pie charts
import ExerciseChart from "./components/ExerciseChart";
import SleepChart from "./components/SleepChart";
import WaterChart from "./components/WaterChart";
import habitsData from "./data/sample.json";

// Register the necessary components for charts
ChartJS.register(
  CategoryScale,    // For category (x) axis
  LinearScale,      // For linear (y) axis
  LineElement,      // For line charts
  PointElement,     // For rendering points in the line chart
  ArcElement,       // Added for doughnut/pie charts
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from JSON
    const userHabits = habitsData.userHabits[0].dailyHabits;
    setData(userHabits);
  }, []);

  return (
    <div>
      <h1>Habit Tracker Charts</h1>
      <div className="main-container">
        <div className="main-charts">
          <ExerciseChart data={data} />
          <SleepChart data={data} />
          <WaterChart data={data} />
        </div>
      </div>
      
    </div>
  );
};

export default App;