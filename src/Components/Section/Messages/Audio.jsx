import React from "react";
import { useNavigate } from "react-router-dom"


const Audio = () => {

	const navigate = useNavigate();

	return ( 

		<div>
      <h1>Audio</h1>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back
      </button>
    </div>

	);
}
 
export default Audio;