import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = React.useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('Image captured:', imageSrc);
    setShowCamera(false);
    alert('Check-in successful!');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to Face Recognition Check-in</h1>
      
      <div className="mb-3">
        <Link to="/admin" className="btn btn-secondary">Admin Login</Link>
      </div>

      {!showCamera ? (
        <button 
          className="btn btn-primary"
          onClick={() => setShowCamera(true)}
        >
          Open Camera
        </button>
      ) : (
        <div className="camera-container">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          <button 
            className="btn btn-success mt-3"
            onClick={captureImage}
          >
            Capture Image
          </button>
          <button 
            className="btn btn-danger mt-3 ms-2"
            onClick={() => setShowCamera(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;