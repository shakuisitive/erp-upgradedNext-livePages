"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const data = [
  {
    id: 1,
    month: "APR",
    num: 270,
  },
  {
    id: 2,
    month: "MAY",
    num: 300,
  },
  {
    id: 3,
    month: "JUN",
    num: 350,
  },
  {
    id: 4,
    month: "JUL",
    num: 300,
  },
  {
    id: 5,
    month: "Aug",
    num: 390,
  },
  {
    id: 6,
    month: "APR",
    num: 350,
  },
  {
    id: 7,
    month: "may",
    num: 400,
  },
];

const LineChart = () => {
  const options = {
    plugins: {
      tooltip: {
        padding: 10,
        boxWidth: 20,
      },
      legend: {
        display: false,
        labels: {},
      },
    },
    scales: {
      y: {
        border: {
          color: "#f6d5d9",
        },
        stacked: true,
        beginAtZero: false,
        grid: {
          borderColor: "white",
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          stepSize: 3,
          padding: 10,
          font: {
            size: 15,
            weight: "bold",
          },
          callback: (value, index, values) => {
            console.log(value);
            console.log(index);
            console.log(values);
          },
        },
      },
      x: {
        border: {
          color: "#f6d5d9",
        },
        grid: {
          drawOnChartArea: false,
          drawBorder: false,
          lineWidth: 5,
          display: true,
        },
        ticks: {
          stepSize: 3,
          padding: 2,
          font: {
            size: 15,
            weight: "bold",
          },
          callback: (value, index, values) => {
            console.log(value);
            console.log(index);
            console.log(values);
          },
        },
      },
    },
    layout: {},
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay	: 0,
    indexAxis: "x",
  };

  const activeUsersData = {
    labels: data?.map((dat) => dat.month),
    datasets: [
      {
        label: "Active users",
        data: data?.map((count) => count?.num),
        backgroundColor: ["white"],
        borderColor: "white",
        borderRadius: 4,
        borderSkipped: false,
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="ml-2  h-[120px] sm:w-full  md:w-[130px] relative 2xl:w-[300px]">
      <Line
        data={activeUsersData}
        options={options}
        plugins={["datalabels"]}
        style={{ 
        //   maxWidth: "120px", mixHeight: '60px',
        // maxHeight: '130px',
       }}
      />
    </div>
  );
};

export default LineChart;
