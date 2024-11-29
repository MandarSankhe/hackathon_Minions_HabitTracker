import React from "react";
import { Doughnut } from "react-chartjs-2";

const WaterChart = ({ data }) => {
    const dates = data.map((day) => day.date);
    const waterData = data.map((day) => {
      const water = day.habits.find((h) => h.name === "Water Intake").progress;
      return parseInt(water.split(" ")[0]); // Assuming the format is "3 Liters"
    });
  
    return (
      <Doughnut
        data={{
          labels: dates,
          datasets: [
            {
              label: "Water Intake (Liters)",
              data: waterData,
              backgroundColor: [
                "rgba(255, 206, 86, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)"
              ],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Water Intake" },
          },
        }}
        className="water-chart"
      />
    );
  };
  
  export default WaterChart;