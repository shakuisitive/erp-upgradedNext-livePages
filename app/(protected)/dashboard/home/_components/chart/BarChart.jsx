"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = [
  {
    id: 1,
    month: "APR",
    num: 400,
  },
  {
    id: 2,
    month: "MAY",
    num: 340,
  },
  {
    id: 3,
    month: "JUN",
    num: 300,
  },
  {
    id: 4,
    month: "JUL",
    num: 200,
  },
  {
    id: 5,
    month: "AUG",
    num: 150,
  },
  {
    id: 6,
    month: "SEP",
    num: 260,
  },
  {
    id: 7,
    month: "OCT",
    num: 211,
  },
  {
    id: 8,
    month: "NOV",
    num: 265,
  },
  {
    id: 9,
    month: "DEC",
    num: 400,
  },
  {
    id: 10,
    month: "JAN",
    num: 215,
  },
  {
    id: 11,
    month: "FEB",
    num: 300,
  },
  {
    id: 12,
    month: "MAR",
    num: 280,
  },
  {
    id: 13,
    month: "FEB",
    num: 260,
  },
  {
    id: 14,
    month: "MAR",
    num: 250,
  },
  {
    id: 15,
    month: "FEB",
    num: 240,
  },
  {
    id: 16,
    month: "MAR",
    num: 400,
  },
  {
    id: 16,
    month: "FEB",
    num: 220,
  },
  {
    id: 17,
    month: "MAR",
    num: 200,
  },
  {
    id: 180,
    month: "FEB",
    num: 160,
  },
  {
    id: 19,
    month: "MAR",
    num: 180,
  },
  {
    id: 20,
    month: "FEB",
    num: 360,
  },
  {
    id: 21,
    month: "MAR",
    num: 250,
  },
  {
    id: 22,
    month: "FEB",
    num: 300,
  },
  {
    id: 23,
    month: "MAR",
    num: 350,
  },
];

const BarChart = () => {
  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {},
      },
      //   adjustBarThickness: {
      //     minThickness: 18,
      //     maxThickness: 32,
      //   },
    },
    scales: {
      y: {
        border: {
          color: "#bee3f2",
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
          color: "#bee3f2",
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
    // responsive: true,
    // maintainAspectRatio: true,
    // resizeDelay: 0,
    indexAxis: "x",
  };

  const averageTimeData = {
    labels: data.map((dat) => dat.month),
    datasets: [
      {
        label: "Average time",
        data: data.map((count) => count?.num),
        backgroundColor: ["white"],
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 2,
      },
    ],
  };

  return (
    <>
      <div className=" h-[35%] relative ">
        <Bar
          data={averageTimeData}
          options={options}
          // plugins={['datalabels']}
          style={
            {
              maxWidth: "120px", mixHeight: '60px',
              maxHeight: '130px',
              aspectRatio: 2
            }
          }
        />
      </div>
    </>
  );
};

export default BarChart;
