import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

async function importData() {
    try {
        console.log("Fetching data...");
        const response = await fetch("https://data.cityofnewyork.us/resource/gkne-dk5s.json");
        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format, expected an array.");
        }

        console.log(`Fetched ${data.length} records. Preparing to insert...`);

        const formattedData = data.map(trip => ({
            vendor_id: trip.vendorid?.toString() || trip.vendor_id?.toString() || trip.VendorID?.toString() || null,
            pickup_datetime: trip.pickup_datetime ? new Date(trip.pickup_datetime).toISOString() : null,
            dropoff_datetime: trip.dropoff_datetime ? new Date(trip.dropoff_datetime).toISOString() : null,
            passenger_count: trip.passenger_count ? Number(trip.passenger_count) : null,
            trip_distance: trip.trip_distance && !isNaN(trip.trip_distance) ? Number(trip.trip_distance) : null,
            pickup_longitude: trip.pickup_longitude && !isNaN(trip.pickup_longitude) ? Number(trip.pickup_longitude) : null,
            pickup_latitude: trip.pickup_latitude && !isNaN(trip.pickup_latitude) ? Number(trip.pickup_latitude) : null,
            dropoff_longitude: trip.dropoff_longitude && !isNaN(trip.dropoff_longitude) ? Number(trip.dropoff_longitude) : null,
            dropoff_latitude: trip.dropoff_latitude && !isNaN(trip.dropoff_latitude) ? Number(trip.dropoff_latitude) : null,
            fare_amount: trip.fare_amount && !isNaN(trip.fare_amount) ? Number(trip.fare_amount) : null,
            payment_type: trip.payment_type || null
        }));
        

        console.log("Sample data:", formattedData[0]);

        const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/trips`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_API_KEY,
                "Authorization": `Bearer ${SUPABASE_API_KEY}`,
                "Prefer": "return=representation"
            },
            body: JSON.stringify(formattedData)
        });

        const result = await insertResponse.json();
        
        if (!insertResponse.ok) {
            throw new Error(`Failed to insert data: ${JSON.stringify(result)}`);
        }

        console.log("Import selesai! Inserted records:", result.length);
    } catch (error) {
        console.error("Error importing data:", error.message);
    }
}

importData();
