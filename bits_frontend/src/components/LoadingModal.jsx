import React from 'react';

const LoadingModal = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="modal show">
      <div className="modal-content">
        <div className="spinner"></div>
        <p>Processing image and verifying with blockchain...</p>
      </div>
    </div>
  );
};

export default LoadingModal;