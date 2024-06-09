import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>kdesigner</h1>
      <nav>
        <ul>
          <li>
            <Link to="/background-remover">Background Remover</Link>
          </li>
          <li>
            <Link to="/audio-splitter">Audio Splitter</Link>
          </li>
          <li>
            <Link to="/bpm-key-detector">BPM & Key Detector</Link>
          </li>
          <li>
            <Link to="/paint-canvas">Paint Canvas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;