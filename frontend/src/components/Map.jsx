import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ trips }) => {
  useEffect(() => {
    const map = L.map("map").setView([40.7128, -74.006], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    trips.forEach((trip) => {
      if (trip.pickup_latitude && trip.pickup_longitude && trip.dropoff_latitude && trip.dropoff_longitude) {
        // Marker Pickup
        L.marker([trip.pickup_latitude, trip.pickup_longitude], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Icon untuk pickup
            iconSize: [25, 25],
          }),
        }).addTo(map).bindPopup(`Pickup: ${trip.pickup_datetime}`);

        // Marker Drop-off
        L.marker([trip.dropoff_latitude, trip.dropoff_longitude], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684913.png", // Icon untuk drop-off
            iconSize: [25, 25],
          }),
        }).addTo(map).bindPopup(`Drop-off: ${trip.dropoff_datetime}`);

        // Garis Rute (Polyline)
        L.polyline(
          [
            [trip.pickup_latitude, trip.pickup_longitude],
            [trip.dropoff_latitude, trip.dropoff_longitude],
          ],
          { color: "blue", weight: 3 }
        ).addTo(map);
      }
    });

    return () => map.remove();
  }, [trips]);

  return <div id="map" className="map-container" style={{ height: "470px", width: "100%" }}></div>;
};

export default Map;
