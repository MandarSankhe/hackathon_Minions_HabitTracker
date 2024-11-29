import React, { useState, useEffect } from "react";
import moment from "moment";
import { loadHabits, saveHabits } from "./HabitStorage";

const HabitTracker = () => {
  const userId = "user1"; 
  const [currentDate, setCurrentDate] = useState(moment()); // Tracks current week or day
  const [habits, setHabits] = useState([]);

  // Load habits from localStorage on component mount or when currentDate changes
  useEffect(() => {
    const loadedHabits = loadHabits(userId, currentDate.format("YYYY-MM-DD"));
    setHabits(loadedHabits);
  }, [currentDate]);

  // Update progress for a specific habit
  const updateProgress = (habitIndex, dayIndex, value) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, index) =>
        index === habitIndex
          ? {
              ...habit,
              progress: habit.progress.map((item, i) => (i === dayIndex ? value : item)),
            }
          : habit
      )
    );
  };
  

  // Save habits to localStorage
  const saveData = () => {
    saveHabits(userId, currentDate.format("YYYY-MM-DD"), habits);
    alert("Habits saved successfully!");
  };

  // Generate dates for the current week
  const getDates = () => {
    const startOfWeek = currentDate.clone().startOf("week");
    return Array(7)
      .fill(0)
      .map((_, index) => startOfWeek.clone().add(index, "days").format("dddd - DD/MM"));
  };

  // Navigate between weeks
  const changeDateRange = (direction) => {
    setCurrentDate(currentDate.clone().add(direction === "next" ? 1 : -1, "week"));
  };

  const dates = getDates();

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif", maxWidth: "100%", padding: "10px" }}>
      <h2 style={{ color: "#3c91e6", textAlign: "center", marginBottom: "20px", fontSize: "24px" }}>
        Habit Tracker
      </h2>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <button
            onClick={() => changeDateRange("prev")}
            style={{
              padding: "10px 15px",
              marginRight: "10px",
              backgroundColor: "#3c91e6",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Previous
          </button>
          <button
            onClick={() => changeDateRange("next")}
            style={{
              padding: "10px 15px",
              backgroundColor: "#3c91e6",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
        <button
          onClick={saveData}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Data
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#3c91e6", color: "#fff" }}>
              <th style={{ padding: "10px", minWidth: "150px", textAlign: "left" }}>Habit</th>
              {dates.map((date, index) => (
                <th key={index} style={{ padding: "10px", minWidth: "150px" }}>
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, habitIndex) => (
                     
              <tr key={habitIndex}>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                    color: "black",
                  }}
                >
                  <strong>{habit.name}</strong>
                  <br />
                  <small className="text-muted">{habit.description}</small>
                </td>
                {dates.map((_, dayIndex) => (
                  <td
                    key={dayIndex}
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <select
                      value={habit.progress[dayIndex] || "Select"}
                      onChange={(e) => updateProgress(habitIndex, dayIndex, e.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        width: "100%",
                        fontSize: "14px",
                      }}
                    >
                        {(habit.options || []).map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitTracker;
