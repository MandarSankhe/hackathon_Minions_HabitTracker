import React from "react";
import { Doughnut } from "react-chartjs-2";

const SleepChart = ({ data }) => {
  const dates = data.map((day) => day.date);
  const sleepData = data.map((day) => {
    const sleep = day.habits.find((h) => h.name === "Sleep").progress;
    return parseInt(sleep.split(" ")[0]); // Assuming the format is "6 hours"
  });

  return (
    <Doughnut
      data={{
        labels: dates,
        datasets: [
          {
            label: "Sleep (Hours)",
            data: sleepData,
            backgroundColor: [
              "rgba(54, 162, 235, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 206, 86, 0.5)"
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Sleep Progress" },
        },
      }}
      className="sleep-chart"
    />
  );
};

export default SleepChart;