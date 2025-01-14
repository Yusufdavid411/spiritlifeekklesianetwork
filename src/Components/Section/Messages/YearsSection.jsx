// YearsSection.js
import React from 'react';
import './YearsPage.css';

const years = ["2020", "2021", "2022", "2023", "2024"];

const YearsSection = ({ onYearSelect, selectedYear }) => {
  return (
    <div className="years-section">
      {years.map((year) => (
        <div
          key={year}
          className={`year-item ${selectedYear === year ? 'active' : ''}`}
          onClick={() => onYearSelect(year)}
          onMouseEnter={(e) => {
            if (window.innerWidth > 768) onYearSelect(year); // Simulate hover on desktop
          }}
        >
          {year}
        </div>
      ))}
    </div>
  );
};

export default YearsSection;