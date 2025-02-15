# 🚖 Yellow Taxi Trip Data
Yellow Taxi Trip Data is a full-stack project built with React.js that provides a real-time dashboard to visualize taxi trips data in New York City. The platform consists of a backend that imports and processes trip data into [Supabase](https://supabase.com/) (PostgreSQL + PostGIS) and a frontend that displays the data using interactive maps and charts.

## 📁 Project Structure
```
YELLOW-TAXI/
│── backend/        # Node.js backend with Supabase integration
│   ├── importData.js
│   ├── .env
│   ├── README.md
│── frontend/       # React-based frontend dashboard
│   ├── src/
│   ├── public/
│   ├── README.md
│── README.md
```
## 🛠 Tech Stack
Backend : 
- Node.js & Express for API and data processing
- Supabase (PostgreSQL + PostGIS) for database storage
- dotenv for environment variable management

Frontend :
- React.js for the user interface
- Vite for fast development build
- Leaflet.js for interactive map visualization
- Chart.js for data analytics

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```
https://github.com/adamkaisa/Yellow-Taxi-Trip-Data.git
```
### 2️⃣ Backend Setup
```
cd backend
npm install
cp .env.example .env  # Configure Supabase credentials
node importData.js
```
### 3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```
### 4️⃣ Open in Browser
Once both backend and frontend are running, open :
```
http://localhost:5173
```
## 📊 Features
- ✅ Import NYC taxi trip data from an open data API
- ✅ Store & manage geographic data using PostGIS
- ✅ Filter trips based on date, distance, and payment type
- ✅ Visualize trips on an interactive map
- ✅ Analyze trip statistics with dynamic charts

## 🔧 Troubleshooting
- If Supabase is not connecting, verify `.env` file in backend/
- If frontend is not displaying data, ensure the backend API is running

This README provides an overview of the entire Yellow Taxi project, while the detailed setup for backend and frontend is inside their respective folders. 🚀
