// MessagesTable.js
// This component receives a list of messages as props and displays them in a table format.

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Helps ensure the props are passed correctly.


const MessagesTable = ({ messages }) => {

	const [visibleRows, setVisibleRows] = useState(0); // Tracks how many rows are visible
  const rowDisplayDelay = 90; // Delay (in milliseconds) between displaying rows. You can change this value.

  useEffect(() => {
    // Incrementally display rows with a delay
    if (visibleRows < messages.length) {
      const timer = setTimeout(() => {
        setVisibleRows((prev) => prev + 1);
      }, rowDisplayDelay);

      // Clear the timer when the component unmounts or updates
      return () => clearTimeout(timer);
    }
  }, [visibleRows, messages.length]); // Dependency ensures effect runs when visibleRows changes

  return (
    <div className="table-Container">
      {/* Table Header */}
      <table>
        <thead>
          <tr>
            <th>Message Title</th>
            <th>Audio</th>
            <th>Video</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {messages.slice(0, visibleRows).map((message, index) => (
            <tr key={index}>
              <td>{message.title}</td>
              <td>
                <a
                  href={message.audioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listen
                </a>
              </td>
              <td style={{ padding: "10px" }}>
                <a
                  href={message.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Prop validation to ensure proper data structure
MessagesTable.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      audioLink: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MessagesTable;
