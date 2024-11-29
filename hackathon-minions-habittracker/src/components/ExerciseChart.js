import React from "react";
import { Line } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';

// Register the necessary chart components
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
);

const ExerciseChart = ({ data }) => {
    const dates = data.map((day) => day.date);

    // Map exercise progress to numeric values for plotting
    const exerciseData = data.map((day) => {
        const exercise = day.habits.find((h) => h.name === "Exercise").progress;
        switch (exercise) {
            case "More than 30 mins":
                return 45;
            case "30 mins":
                return 30;
            case "Less than 30 mins":
                return 15;
            default:
                return 0;
        }
    });

    // Prepare data for the chart
    const exerciseChartData = {
        labels: dates,
        datasets: [
            {
                label: 'Exercise Progress (Minutes)',  
                data: exerciseData,  
                borderColor: '#A3DCEB',  
                backgroundColor: 'rgba(42, 206, 251, 0.1)',  
                borderWidth: 2,  
                fill: true 
            }
        ]
    };

    // Chart options
    const options = {
        plugins: {
            legend: {
                display: false  
            },
            title: {
                display: true,
                text: 'Exercise Progress'  
            }
        },
        scales: {
            y: {
                beginAtZero: false,  
                title: {
                    display: false  
                }
            },
            x: {
                display: true  
            }
        },
        responsive: true,
        maintainAspectRatio: false  
    };

    return <Line data={exerciseChartData} options={options} className="exercise-chart" />;
};

export default ExerciseChart;
