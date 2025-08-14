import React from 'react';
import { Shield, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { formatDateString, formatDateTime, getStatusClass, getStatusText } from '../utils/helpers';

const VerifySection = ({ verificationResult }) => {
  if (!verificationResult) {
    return (
      <section className="section active">
        <div className="card">
          <h2>Verification Results</h2>
          <div className="no-results">
            <Shield size={64} />
            <p>No verification results yet. Please scan a medicine first.</p>
          </div>
        </div>
      </section>
    );
  }

  // Determine status from expiryDate
  const status = getStatusClass(verificationResult.expiryDate);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'authentic':
        return <CheckCircle size={24} />;
      case 'expired':
        return <Clock size={24} />;
      default:
        return <AlertCircle size={24} />;
    }
  };

  return (
    <section className="section active">
      <div className="card">
        <h2>Verification Results</h2>
        <div className="verification-card">
          <div className="verification-header">
            <div className="medicine-name">{verificationResult.name}</div>
            <div className={`status-badge status-${status}`}>
              {getStatusIcon(status)}
              {getStatusText(verificationResult.expiryDate)}
            </div>
          </div>
          <div className="verification-details">
            <div className="detail-item">
              <span className="detail-label">Medicine ID</span>
              <span className="detail-value">{verificationResult.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Manufacturer</span>
              <span className="detail-value">{verificationResult.manufacturer}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Batch Number</span>
              <span className="detail-value">{verificationResult.batchNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Manufacturing Date</span>
              <span className="detail-value">{formatDateString(verificationResult.manufacturingDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Expiry Date</span>
              <span className="detail-value">{formatDateString(verificationResult.expiryDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Blockchain Hash</span>
              <span className="detail-value">{verificationResult.blockchainHash || 'Not Available'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Updated</span>
              <span className="detail-value">{formatDateTime(verificationResult.lastUpdated)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifySection;
