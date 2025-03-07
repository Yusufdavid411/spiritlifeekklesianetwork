import './drama.css'
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"


const Aside = () => {
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh", overflow: "hidden" }}>
      
      <span
        onClick={() => navigate("/")}
        className="message-btn"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="option-icon-btn" />
      </span>

      {/* YouTube Video Background */}
      <ReactPlayer
        url="https://youtu.be/DbWQ7UDhn8Q?si=VmiBkyOQIpVXm-Dt"
        playing={true}
        loop={true}
        muted={isMuted}
        controls={false}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />

      {/* Button to Mute/Unmute */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        style={{
          position: "absolute",
          top: "26vh",
          right: "10px",
          padding: "8px 10px",
          background: "linear-gradient(90deg, rgb(82, 9, 124),rgb(171, 30, 17),rgb(82, 9, 124))",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Content Above the Video */}
      <div style={{ position: "relative", fontSize: "1.5rem", zIndex: 1, color: "white", textAlign: "center", marginTop: "20%" }}>
        <p>Kingdom Parables <br /> (Drama Department)</p>
      </div>
    </div>
  );
};

export default Aside;
