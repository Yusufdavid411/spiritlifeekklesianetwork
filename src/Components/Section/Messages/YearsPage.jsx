// YearsPage.js
import React, { useState } from 'react';
import YearsSection from './YearsSection';
import DetailsSection from './DetailsSection';
import './YearsPage.css';

const YearsPage = () => {
  const [selectedYear, setSelectedYear] = useState(null); // State to track selected year

  const handleYearSelect = (year) => {
    setSelectedYear(year); // Update selected year
  };

  return (
    <div className="years-page">
      <h1>Select a Year</h1>
      <div className="content-container">
        <YearsSection onYearSelect={handleYearSelect} selectedYear={selectedYear} />
        <DetailsSection year={selectedYear} />
      </div>
    </div>
  );
};

export default YearsPage;