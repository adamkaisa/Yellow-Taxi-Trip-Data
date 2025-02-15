# 🚖 Yellow Taxi Trip Data - Frontend

This is the frontend of the Yellow Taxi Trip Data, built with React.js and connected to Supabase for backend services. The dashboard allows users to visualize taxi trip data, filter trips, and view details on a map and chart.

## 🚀 Features
- 🌍 Interactive Map - Displays trip routes using coordinates.
- 📊 Data Visualization - Shows trip statistics with charts.
- 🎛 Advanced Filtering - Users can filter trips based on date, fare amount, distance, and payment type.
- 🔥 Supabase Integration - Fetches trip data from Supabase (PostgreSQL + PostGIS).
- 🎨 Modern UI - Built with responsive design and intuitive user experience.

## 📡 Connecting to Supabase
Using `src/services/supabaseClient.js` to handle API requests :
```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
```
Put `.env` in the root of your project :

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```
## ✅ Deployment
You can deploy the frontend using Vercel, Netlify, or any static hosting service :
```js
npm run build
```
```js
npm run dev
```