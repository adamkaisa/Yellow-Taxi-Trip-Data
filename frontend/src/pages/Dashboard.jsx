import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import Filter from "../components/Filter";
import Map from "../components/Map";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import { Container, Grid, Typography, Paper } from "@mui/material";
import "../styles.css";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase.from("trips").select("*");
      if (error) {
        console.error("Error fetching trips:", error);
      } else {
        console.log("Raw API Data:", data);
        setTrips(data);
        setFilteredTrips(data);
      }
    };

    fetchTrips();
  }, []);

  const handleFilterChange = (filters) => {
    console.log("Filters Applied:", filters);

    const filtered = trips.filter((trip) => {
      const pickupDate = new Date(trip.pickup_datetime).toISOString().split("T")[0];

      return (
        (!filters.time || pickupDate === filters.time) &&
        (!filters.fare || parseFloat(trip.fare_amount) <= parseFloat(filters.fare)) &&
        (!filters.tripDistance || parseFloat(trip.trip_distance) <= parseFloat(filters.tripDistance)) &&
        (!filters.paymentType || trip.payment_type === filters.paymentType)
      );
    });

    console.log("Filtered Trips:", filtered);
    setFilteredTrips(filtered);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography 
        variant="h5" 
        align="left"
        gutterBottom 
        sx={{ color: "#222", fontWeight: "bold", ml: 2 }}
      >
        Yellow Taxi Trip Data
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            {/* Analytics Dashboard */}
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 2, 
                  bgcolor: "#BCBCBC", 
                  border: "1px solid #2A3240", 
                  borderRadius: "12px" 
                }}
              >
                <Filter onFilterChange={handleFilterChange} />
              </Paper>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 2, 
                  height: 400, 
                  bgcolor: "#BCBCBC", 
                  border: "1px solid #2A3240", 
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <PieChart trips={filteredTrips} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {/* Map */}
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 2, 
                  height: 470, 
                  bgcolor: "#BCBCBC", 
                  border: "1px solid #2A3240", 
                  borderRadius: "12px" 
                }}
              >
                <Map trips={filteredTrips} />
              </Paper>
            </Grid>

            {/* Line Chart */}
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 2, 
                  height: 400, 
                  bgcolor: "#BCBCBC", 
                  border: "1px solid #2A3240", 
                  borderRadius: "12px" 
                }}
              >
                <LineChart trips={filteredTrips} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
    </Container>
  );
};

export default Dashboard;
