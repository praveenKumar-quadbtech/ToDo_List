import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PrograssChart = () => {
  const data = {
    labels: ["Pending", "Done"],
    datasets: [
      {
        data: [3, 8], 
        backgroundColor: ["#0D221D", "#2E7D32"], 
        hoverBackgroundColor: ["#0A1815", "#1B5E20"],
        borderWidth : 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%", 
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
  <div style={{ width: "100%", height: "100%" }}>
    <Doughnut data={data} options={options} />
  </div>
  );
};

export default PrograssChart;
