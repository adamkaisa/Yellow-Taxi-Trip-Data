import React, { useState } from "react";
import { FaCalendarAlt, FaDollarSign, FaCreditCard } from "react-icons/fa";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    time: "",
    fare: "",
    tripDistance: 50,
    paymentType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="filter-container">
      <h2>Analytics Dashboard</h2>

      {/* Date Filter */}
      <label><FaCalendarAlt size={12} /> Select Date</label>
      <input type="date" name="time" value={filters.time} onChange={handleChange} />

      {/* Fare Filter */}
      <label><FaDollarSign size={12} /> Max Fare</label>
      <input type="number" name="fare" placeholder="Enter max fare" value={filters.fare} onChange={handleChange} />

      {/* Trip Distance Filter */}
      <label>Trip Distance: {filters.tripDistance} miles</label>
      <input type="range" name="tripDistance" min="0" max="50" value={filters.tripDistance} onChange={handleChange} />

      {/* Payment Type Filter */}
      <label><FaCreditCard size={12} /> Payment Type</label>
      <select name="paymentType" value={filters.paymentType} onChange={handleChange}>
        <option value="">Select Payment Type</option>
        <option value="CRD">Credit Card</option>
        <option value="CSH">Cash</option>
      </select>

      {/* Apply Filters Button */}
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;
