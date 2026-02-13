import './drama.css'
import React, { useState } from "react";
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"


const Aside = () => {
  const navigate = useNavigate();

  return (

    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      
      {/* TOP BAR */}
      <div className="dept-top">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <select
          className="dept-switcher"
          onChange={(e) => navigate(`/departments/${e.target.value}`)}
          defaultValue="drama"
        >
          <option value="child">Children</option>
          <option value="drama">Drama</option>
          <option value="evan">Evangelism</option>
          <option value="media">Media</option>
          <option value="prayer">Prayer</option>
          <option value="protocol">Protocol</option>
          <option value="usher">Ushering</option>
          <option value="welfare">Welfare</option>
          <option value="zoestreams">Zoe Streams</option>
        </select>
      </div>

      {/* YouTube Video Background */}
      <ReactPlayer
        url="https://youtu.be/DbWQ7UDhn8Q?si=VmiBkyOQIpVXm-Dt"
        className="video"
        playing={true}
        loop={true}
        controls={true}
        width="100%"
        height="100%"
        style={{ top: 0, left: 0,}}
      />

      {/* <ReactPlayer
        className="video"
        style={{ top: 0, left: 0, zIndex: 1,}}
        url='https://youtube.com/shorts/APUm_UaDjqg?si=Zozt1010PlQ5KIXr'
      /> */}

      {/* Content Above the Video */}
      {/* <div style={{ position: "relative", fontSize: "1.5rem", zIndex: 20, color: "white", textAlign: "center", marginTop: "10%" }}>
        <p>Kingdom Parables <br /> (Drama Department)</p>
      </div> */}
    </div>
  );
};

export default Aside;
