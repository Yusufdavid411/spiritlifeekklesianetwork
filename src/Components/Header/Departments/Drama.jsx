import './drama.css'
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"


const Aside = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh", overflow: "hidden" }}>
      
      <span
        onClick={() => navigate("/")}
        className="drama-btn"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="option-icon-btn" />
      </span>

      {/* YouTube Video Background */}
      <ReactPlayer
        url="https://youtu.be/DbWQ7UDhn8Q?si=VmiBkyOQIpVXm-Dt"
        // className="video"
        playing={true}
        loop={true}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0,}}
      />

      {/* Content Above the Video */}
      <div style={{ position: "relative", fontSize: "1.5rem", zIndex: 1, color: "white", textAlign: "center", marginTop: "10%" }}>
        <p>Kingdom Parables <br /> (Drama Department)</p>
      </div>
    </div>
  );
};

export default Aside;
