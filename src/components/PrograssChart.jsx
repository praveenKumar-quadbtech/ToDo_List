import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PrograssChart = ({ tasks }) => {


  const pendingTask = tasks.reduce((count, task) => task.progress === "pending" ? count + 1 : count, 0)
  const completedTask = tasks.reduce((count, task) => task.progress === "completed" ? count + 1 : count, 0)



  const data = {
    labels: ["Pending", "Done"],
    datasets: [
      {
        data: [pendingTask, completedTask],
        backgroundColor: ["#2E7D32", "#0D221D"],
        hoverBackgroundColor: ["#1B5E20", "#0A1815"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
        },
      },
    },
  };

  return (
    <Doughnut
      data={data}
      options={options}
      width={200}
      height={200}
    />
  );
};

export default PrograssChart;
