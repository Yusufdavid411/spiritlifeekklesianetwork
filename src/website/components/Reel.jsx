import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './Reel.css';

const Reel = () => {
  const [youtubeUrl] = useState('https://youtube.com/shorts/U3c0SAUTK-Q?si=tAmk6DPU8iwDB91t'); // Replace with your YouTube link

  return (
    <div className="reel-container">
      <div className="reel-wrapper">
        <ReactPlayer
          url={youtubeUrl}
          controls
          width="100%"
          height="100%"
          playing={false}
        />
      </div>
    </div>
  );
};

export default Reel;