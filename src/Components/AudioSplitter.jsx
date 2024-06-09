import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AudioSplitter = () => {
  const [file, setFile] = useState(null);
  const [stems, setStems] = useState({});
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const outputPath = response.data.output;
        setStems({
          vocals: `${outputPath}/vocals.wav`,
          drums: `${outputPath}/drums.wav`,
          bass: `${outputPath}/bass.wav`,
          other: `${outputPath}/other.wav`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSaveFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', `${fileName}.wav`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Back</button>
      <h2>Audio Splitter</h2>
      <input type="file" onChange={handleFileUpload} accept="audio/*" />
      {stems.vocals && (
        <div>
          <h3>Vocals</h3>
          <button onClick={() => handleSaveFile(stems.vocals, 'vocals')}>Download Vocals</button>
        </div>
      )}
      {stems.drums && (
        <div>
          <h3>Drums</h3>
          <button onClick={() => handleSaveFile(stems.drums, 'drums')}>Download Drums</button>
        </div>
      )}
      {stems.bass && (
        <div>
          <h3>Bass</h3>
          <button onClick={() => handleSaveFile(stems.bass, 'bass')}>Download Bass</button>
        </div>
      )}
      {stems.other && (
        <div>
          <h3>Other</h3>
          <button onClick={() => handleSaveFile(stems.other, 'other')}>Download Other</button>
        </div>
      )}
    </div>
  );
};

export default AudioSplitter;
