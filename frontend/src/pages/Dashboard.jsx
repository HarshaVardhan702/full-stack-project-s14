import React, { useState, useEffect } from 'react';
import CertificationCard from '../components/CertificationCard.jsx';
import '../styles/Dashboard.css';

function Dashboard({ userRole }) {
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
    }
  ]);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expiringSoon: 0,
    expired: 0
  });

  useEffect(() => {
    calculateStats();
  }, [certifications]);

  const calculateStats = () => {
    const today = new Date();
    let active = 0;
    let expiringSoon = 0;
    let expired = 0;

    certifications.forEach(cert => {
      const expiry = new Date(cert.expiryDate);
      const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry < 0) {
        expired++;
      } else if (daysUntilExpiry < 30) {
        expiringSoon++;
      } else {
        active++;
      }
    });

    setStats({
      total: certifications.length,
      active,
      expiringSoon,
      expired
    });
  };

  const handleDelete = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const handleEdit = (certification) => {
    console.log('Edit certification:', certification);
    // Will be connected to edit page
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your certification overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Certifications</div>
        </div>
        <div className="stat-card active">
          <div className="stat-number">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-number">{stats.expiringSoon}</div>
          <div className="stat-label">Expiring Soon</div>
        </div>
        <div className="stat-card expired">
          <div className="stat-number">{stats.expired}</div>
          <div className="stat-label">Expired</div>
        </div>
      </div>

      <div className="certifications-section">
        <div className="section-header">
          <h2>Recent Certifications</h2>
          <a href="/certifications" className="view-all">View All →</a>
        </div>

        <div className="certifications-grid">
          {certifications.slice(0, 3).map(cert => (
            <CertificationCard
              key={cert.id}
              certification={cert}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {userRole === 'admin' && (
        <div className="admin-section">
          <h2>Admin Tools</h2>
          <div className="admin-actions">
            <button className="btn btn-primary">View All Users</button>
            <button className="btn btn-primary">Manage Notifications</button>
            <button className="btn btn-primary">System Reports</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
