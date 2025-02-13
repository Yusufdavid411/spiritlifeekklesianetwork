import React, { useEffect, useState } from "react";
import axios from "axios";
import './messages.css'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the CSV data
    const fetchData = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/18OVONeRvroB2xmxzFNIHQrQGYhRgdC5sTV9BqoOT368/gviz/tq?tqx=out:csv";
      try {
        const response = await axios.get(url);
        const csvData = response.data;

        // Parse the CSV into JSON
        const rows = csvData.split("\n").slice(1); // Skip the header row
        const parsedData = rows
          .map((row) => {
            const fields = row.split(",");
            if (fields.length < 3) return null; // Handle malformed rows

            const [year, month, title, audio, video, speaker] = fields.map((field) =>
              field.trim().replace(/^"|"$/g, "") // Remove quotes and trim spaces
            );

            return { year, month, title, audio, video, speaker };
          })
          .filter((item) => item) // Remove null entries
          .reverse(); // Reverse the array to display the data from bottom to top

        setData(parsedData);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-Container">

      {/* table */}

      <table>

        <thead>
          <tr>
            <th>Message Title</th>
            <th>Audio</th>
            <th>Video</th>
          </tr>
        </thead>

        <tbody className="data-list">
          {data.map((item, index) => (
            <tr key={index} className="data-item">

              <td>
                <small>{item.month} {item.year}</small>
                <br />
                {item.title}
              </td>

              {item.audio && (
                <td>
                  <a href={item.audio} target="_blank" rel="noopener noreferrer">
                    Audio
                  </a>
                </td>
              )}

              {item.video && (
                <td>
                  <a href={item.video} target="_blank" rel="noopener noreferrer">
                    Video
                  </a>
                </td>
              )}

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default App;
