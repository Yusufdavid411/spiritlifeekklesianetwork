// MessagesTable.js
// This component receives a list of messages as props and displays them in a table format.

import React from "react";
import PropTypes from "prop-types"; // Helps ensure the props are passed correctly.
import './messages.css'


const MessagesTable = ({ messages }) => {
  return (
    <div className="container">
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
          {messages.map((message, index) => (
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
