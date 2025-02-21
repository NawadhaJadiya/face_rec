import React, { useState } from 'react';
import Webcam from 'react-webcam';

const EmployeeRegistration = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = React.useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowCamera(false);
  };

  const handleRegistration = () => {
    console.log('Registering employee:', { employeeName, capturedImage });
    alert('Employee registered successfully!');
    setEmployeeName('');
    setCapturedImage(null);
  };

  return (
    <div className="container mt-5">
      <h2>Employee Registration</h2>
      <div className="mt-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>

        {!showCamera && !capturedImage && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowCamera(true)}
          >
            Capture Photo
          </button>
        )}

        {showCamera && (
          <div className="camera-container">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam"
            />
            <button 
              className="btn btn-success mt-3"
              onClick={capturePhoto}
            >
              Take Photo
            </button>
            <button 
              className="btn btn-danger mt-3 ms-2"
              onClick={() => setShowCamera(false)}
            >
              Cancel
            </button>
          </div>
        )}

        {capturedImage && (
          <div className="mt-3">
            <img src={capturedImage} alt="Captured" className="captured-image" />
            <button 
              className="btn btn-warning d-block mt-2"
              onClick={() => {
                setCapturedImage(null);
                setShowCamera(true);
              }}
            >
              Retake Photo
            </button>
          </div>
        )}

        {employeeName && capturedImage && (
          <button 
            className="btn btn-success mt-3"
            onClick={handleRegistration}
          >
            Register Employee
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeRegistration;