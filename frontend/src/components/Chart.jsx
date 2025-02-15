import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const ChartComponent = ({ trips }) => {
  if (!trips || trips.length === 0) {
    return <p>Loading...</p>;
  }

  const filteredTrips = trips.filter((_, index) => index % 10 === 0);
  const labels = filteredTrips.map((trip) => new Date(trip.pickup_datetime).toLocaleDateString());
  const fares = filteredTrips.map((trip) => parseFloat(trip.fare_amount));;


  const data = {
    labels: labels,
    datasets: [
      {
        label: "Fare Amount Over Time",
        data: fares,
        borderColor: "#444",
        backgroundColor: "#888",
        borderWidth: 2,
        pointRadius: 1,
      },
    ],
  };
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
