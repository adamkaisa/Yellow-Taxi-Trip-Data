import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ trips }) => {
  if (!trips || trips.length === 0) {
    return <p>Loading...</p>;
  }

  const paymentCounts = trips.reduce((acc, trip) => {
    if (trip.payment_type === "CSH" || trip.payment_type === "CRD") {
      const key = trip.payment_type === "CSH" ? "Cash" : "Credit Card";
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(paymentCounts),
    datasets: [
      {
        label: "Payment Methods",
        data: Object.values(paymentCounts),
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 2,
        borderColor: "#444",
        hoverOffset: 20, // Efek hover lebih kecil agar tidak keluar dari container
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Mencegah chart terpotong
    layout: {
      padding: 20, // Memberi ruang ekstra agar efek hover tidak terpotong
    },
    plugins: {
      legend: { display: false }, // Matikan legend default
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-container" style={{ minHeight: "350px", textAlign: "center" }}>
      <h2>Payment Type Distribution</h2>
      <div style={{ height: "250px" }}> {/* Menyesuaikan ukuran canvas */}
        <Pie data={data} options={options} />
      </div>

      {/* Tambahkan legend manual di bawah chart */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "14px", color: "#444" }}>
          <div style={{ width: "15px", height: "15px", backgroundColor: "#FF6384", borderRadius: "50%" }}></div>
          <span>Cash</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "14px", color: "#444"}}>
          <div style={{ width: "15px", height: "15px", backgroundColor: "#36A2EB", borderRadius: "50%" }}></div>
          <span>Credit Card</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
