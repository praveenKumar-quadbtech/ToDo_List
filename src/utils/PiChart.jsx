import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

// Colors for each segment
const COLORS = ["#1B4D3E", "#3A923B"]; // Dark Green (Done), Light Green (Pending)

// Sample data (You can replace this with API data)
const taskData = [
    { name: "Pending", value: 3 },
    { name: "Done", value: 8 }
];

const DoughnutChart = () => {
    return (
        <div className="flex flex-col items-center h-full">
            <PieChart width={50} height={50}>
                <Pie
                    data={taskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={10}
                    outerRadius={20}
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="value"
                    stroke="none"
                >
                    {taskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                {/* <Legend iconType="circle" layout="horizontal" align="center" className="flex"/> */}

            </PieChart>
        </div>
    );
};

export default DoughnutChart;
