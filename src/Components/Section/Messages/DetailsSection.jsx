// DetailsSection.js
import React from 'react';
import './YearsPage.css';

const contentByYear = {
  "2020": ["Event A", "Event B", "Event C"],
  "2021": ["Event D", "Event E", "Event F"],
  "2022": ["Event G", "Event H", "Event I"],
  "2023": ["Event J", "Event K", "Event L"],
  "2024": ["Event M", "Event N", "Event O"],
};

const DetailsSection = ({ year }) => {
  if (!year) {
    return <div className="details-section">Select a year to view details</div>;
  }

  return (
    <div className="details-section">
      <h2>Details for {year}</h2>
      <ul>
        {contentByYear[year].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsSection;