import React, { useState } from 'react';
import CertificationCard from '../components/CertificationCard.jsx';
import '../styles/CertificationList.css';

function CertificationList({ userRole }) {
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      credentialId: 'AWS-123456',
      issuedDate: '2023-05-15',
      expiryDate: '2025-05-15',
      certificateUrl: '#'
    },
    {
      id: 2,
      name: 'Google Cloud Professional Cloud Architect',
      issuer: 'Google Cloud',
      credentialId: 'GCP-789012',
      issuedDate: '2022-08-20',
      expiryDate: '2024-08-20',
      certificateUrl: '#'
    },
    {
      id: 3,
      name: 'Certified Kubernetes Administrator',
      issuer: 'Linux Foundation',
      credentialId: 'CKA-345678',
      issuedDate: '2023-11-10',
      expiryDate: '2026-11-10',
      certificateUrl: '#'
    },
    {
      id: 4,
      name: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      credentialId: 'AZ-900-654321',
      issuedDate: '2023-02-28',
      expiryDate: '2025-02-28',
      certificateUrl: '#'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry < 30) return 'expiring-soon';
    return 'active';
  };

  const filteredAndSortedCerts = certifications
    .filter(cert => {
      const matchesFilter = filterStatus === 'all' || getStatus(cert.expiryDate) === filterStatus;
      const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'expiry') {
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      }
      return 0;
    });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      setCertifications(certifications.filter(cert => cert.id !== id));
    }
  };

  const handleEdit = (certification) => {
    console.log('Edit certification:', certification);
  };

  return (
    <div className="certification-list-page">
      <div className="page-header">
        <h1>All Certifications</h1>
        <p>Manage and track all your professional certifications</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or issuer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="expiring-soon">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="expiry">Expiry Date</option>
            </select>
          </div>

          <a href="/add-certification" className="btn btn-primary">+ Add New Certification</a>
        </div>
      </div>

      <div className="results-info">
        <p>Showing {filteredAndSortedCerts.length} of {certifications.length} certifications</p>
      </div>

      {filteredAndSortedCerts.length > 0 ? (
        <div className="certifications-grid">
          {filteredAndSortedCerts.map(cert => (
            <CertificationCard
              key={cert.id}
              certification={cert}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No certifications found matching your criteria.</p>
          <a href="/add-certification" className="btn btn-primary">Add Your First Certification</a>
        </div>
      )}
    </div>
  );
}

export default CertificationList;
