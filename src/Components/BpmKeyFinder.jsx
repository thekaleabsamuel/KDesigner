import React, { useState } from 'react';
import * as BeatDetector from 'web-audio-beat-detector';
import { Key } from 'tonal';
import { useNavigate } from 'react-router-dom';

const BpmKeyDetector = () => {
  const [file, setFile] = useState(null);
  const [bpm, setBpm] = useState(null);
  const [key, setKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const detectBpmAndKey = async () => {
    setIsLoading(true);
    setBpm(null);
    setKey(null);

    try {
      const beatDetector = new BeatDetector();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(await file.arrayBuffer());
      const bpmResult = await beatDetector.detect(audioBuffer);
      const keyResult = Key.key(audioBuffer);

      setBpm(bpmResult.bpm.toFixed(2));
      setKey(keyResult);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Back</button>
      <h2>BPM & Key Detector</h2>
      <input type="file" onChange={handleFileChange} accept="audio/*" />
      <button onClick={detectBpmAndKey} disabled={!file || isLoading}>
        {isLoading ? 'Detecting BPM and key...' : 'Detect BPM and Key'}
      </button>
      {bpm && <p>BPM: {bpm}</p>}
      {key && <p>Key: {key}</p>}
    </div>
  );
};

export default BpmKeyDetector;