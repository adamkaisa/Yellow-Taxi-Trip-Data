import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = ({ trips }) => {
  if (!trips || trips.length === 0) {
    return <p>Loading...</p>;
  }

  const filteredTrips = trips.filter((_, index) => index % 10 === 0);
  const labels = filteredTrips.map((trip) => new Date(trip.pickup_datetime).toLocaleDateString());
  const fares = filteredTrips.map((trip) => parseFloat(trip.fare_amount));

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
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
      },
      tooltip: {
        enabled: true,
        bodyAlign: "center",
      },
    },
    scales: {
      x: { ticks: { maxTicksLimit: 10 } },
      y: { beginAtZero: true },
    },
  };
  

  return (
    <div className="chart-container" style={{ minHeight: "350px", textAlign: "center" }}>
      <h2 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px", color: "#222", marginRight: "15px" }}>
        Fare Analytics
      </h2>
      <div style={{ height: "350px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
