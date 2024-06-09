import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from  "./Home";
import BackgroundRemover from './BackgroundRemover';
import AudioSplitter from './AudioSplitter'; // This component doesn't exist yet, we'll create it later
import BpmKeyDetector from './BpmKeyFinder'; // This component doesn't exist yet, we'll create it later
import PaintCanvas from './PaintCanvas'; // This component doesn't exist yet, we'll create it later

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/background-remover" element={<BackgroundRemover />} />
        <Route path="/audio-splitter" element={<AudioSplitter />} />
        <Route path="/bpm-key-finder" element={<BpmKeyDetector />} />
        <Route path="/paint-canvas" element={<PaintCanvas />} />
      </Routes>
    </Router>
  );
}

export default App;