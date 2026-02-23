import React from 'react';
import '../styles/CertificationCard.css';

function CertificationCard({ certification, onEdit, onDelete }) {
  const getStatusClass = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry < 30) return 'expiring-soon';
    return 'active';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const daysUntilExpiry = Math.floor(
    (new Date(certification.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className={`certification-card ${getStatusClass(certification.expiryDate)}`}>
      <div className="card-header">
        <h3 className="cert-name">{certification.name}</h3>
        <span className={`status-badge ${getStatusClass(certification.expiryDate)}`}>
          {getStatusClass(certification.expiryDate) === 'expired' ? 'Expired' : 
           getStatusClass(certification.expiryDate) === 'expiring-soon' ? '⚠️ Expiring Soon' : '✓ Active'}
        </span>
      </div>

      <div className="card-body">
        <div className="cert-info">
          <div className="info-row">
            <span className="info-label">Issuer:</span>
            <span className="info-value">{certification.issuer}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Credential ID:</span>
            <span className="info-value">{certification.credentialId}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Issued Date:</span>
            <span className="info-value">{formatDate(certification.issuedDate)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Expiry Date:</span>
            <span className="info-value">{formatDate(certification.expiryDate)}</span>
          </div>
          {daysUntilExpiry >= 0 && (
            <div className="info-row">
              <span className="info-label">Days Remaining:</span>
              <span className="info-value days-count">{daysUntilExpiry}</span>
            </div>
          )}
        </div>

        {certification.certificateUrl && (
          <div className="cert-actions">
            <a href={certification.certificateUrl} target="_blank" rel="noopener noreferrer" className="btn-link">
              View Certificate
            </a>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button className="btn btn-secondary" onClick={() => onEdit(certification)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(certification.id)}>Delete</button>
      </div>
    </div>
  );
}

export default CertificationCard;
