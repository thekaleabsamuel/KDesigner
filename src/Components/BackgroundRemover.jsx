import React, { useState } from 'react';
import axios from 'axios';
import download from 'downloadjs';
import { useNavigate } from 'react-router-dom';


const BackgroundRemover = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeBackground = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image_file', file);

    try {
      const response = await axios.post(
        'https://api.remove.bg/v1.0/removebg',
        formData,
        {
          headers: {
            'X-Api-Key': 'CEYTdKUabPMmzZ2rqsy6VHKh',
          },
          responseType: 'arraybuffer',
        }
      );

      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      setResult(`data:image/png;base64,${base64}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveImage = () => {
    if (result) {
      const fileName = `${file.name.split('.')[0]}_no_bg.png`;
      download(result, fileName, 'image/png');
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Back</button>
      <h2>Background Remover</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={removeBackground} disabled={!file || isLoading}>
        {isLoading ? 'Removing background...' : 'Remove Background'}
      </button>
      {result && (
        <>
          <img src={result} alt="Result" />
          <button onClick={saveImage}>Save Image</button>
        </>
      )}
    </div>
  );
};

export default BackgroundRemover;