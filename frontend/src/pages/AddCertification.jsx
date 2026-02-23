import React, { useState } from 'react';
import '../styles/AddCertification.css';

function AddCertification({ userRole }) {
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    credentialId: '',
    issuedDate: '',
    expiryDate: '',
    certificateUrl: '',
    notes: ''
  });

  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.name || !formData.issuer || !formData.issuedDate || !formData.expiryDate) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitMessage('✓ Certification added successfully! Redirecting...');
    
    // Reset form
    setFormData({
      name: '',
      issuer: '',
      credentialId: '',
      issuedDate: '',
      expiryDate: '',
      certificateUrl: '',
      notes: ''
    });

    // Simulate redirect after 2 seconds
    setTimeout(() => {
      setSubmitMessage('');
    }, 2000);
  };

  return (
    <div className="add-certification-page">
      <div className="page-header">
        <h1>Add New Certification</h1>
        <p>Fill in the details of your professional certification</p>
      </div>

      <div className="form-container">
        <form className="add-cert-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Certification Details</h2>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="name">Certification Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., AWS Solutions Architect Associate"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="issuer">Issuing Organization *</label>
                <input
                  type="text"
                  id="issuer"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  placeholder="e.g., Amazon Web Services"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="credentialId">Credential ID</label>
                <input
                  type="text"
                  id="credentialId"
                  name="credentialId"
                  value={formData.credentialId}
                  onChange={handleChange}
                  placeholder="e.g., AWS-123456"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Dates</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="issuedDate">Issue Date *</label>
                <input
                  type="date"
                  id="issuedDate"
                  name="issuedDate"
                  value={formData.issuedDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date *</label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Information</h2>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="certificateUrl">Certificate URL</label>
                <input
                  type="url"
                  id="certificateUrl"
                  name="certificateUrl"
                  value={formData.certificateUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes or details about this certification"
                  rows="4"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg">Add Certification</button>
            <a href="/certifications" className="btn btn-secondary btn-lg">Cancel</a>
          </div>

          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes('✓') ? 'success' : 'error'}`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddCertification;
