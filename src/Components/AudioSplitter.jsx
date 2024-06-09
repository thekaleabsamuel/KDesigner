import React, { useState } from 'react';
import * as essentia from 'essentia.js';

const AudioSplitter = () => {
  const [file, setFile] = useState(null);
  const [stems, setStems] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile) {
      const stem = new essentia.StemGenerator(uploadedFile.path);
      const output = stem.generate();
      setStems([...output]);
    }
  };

  const handleSaveFile = (fileData) => {
    const fileContent = fileData.toString();
    const downloadLink = window.URL.createObjectURL(new Blob([fileContent]));
    const link = document.createElement('a');
    link.href = downloadLink;
    link.setAttribute('download', 'music');
    document.body.appendChild(link);
    link.click();
  };

  const renderStems = () => {
    return stems.map((stem, index) => (
      <div key={index}>
        {stem.split('/')}
        <input
          type="text"
          defaultValue={stem.default}
          placeholder="New Stem Name"
        />
        <button onClick={() => handleSaveFile(stem)}>Save</button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Audio Splitter</h2>
      <input type="file" onChange={handleFileUpload} accept="audio/*" />
      {renderStems()}
    </div>
  );
};

export default AudioSplitter;