import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import StatusBadge from '../components/StatusBadge';
import { formatDate, getDaysUntilExpiry } from '../utils/certUtils';
import { RiArrowLeftLine, RiDownloadLine, RiAwardLine, RiCalendarLine, RiBuildingLine } from 'react-icons/ri';

const CertificateViewPage = () => {
    const { id } = useParams();
    const { getCertById } = useData();
    const navigate = useNavigate();
    const cert = getCertById(id);

    if (!cert) {
        return (
            <div className="empty-state fade-up">
                <div className="empty-state-icon">❌</div>
                <div className="empty-state-text">Certificate not found</div>
                <button className="btn-primary-custom" onClick={() => navigate('/certifications')} style={{ marginTop: 16 }}>
                    <RiArrowLeftLine /> Back to My Certifications
                </button>
            </div>
        );
    }

    const days = getDaysUntilExpiry(cert.expiryDate);

    return (
        <div className="fade-up">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Certificate Details</h1>
                    <p className="page-subtitle">View and download your certificate</p>
                </div>
                <button className="btn-secondary-custom" onClick={() => navigate(-1)}>
                    <RiArrowLeftLine /> Back
                </button>
            </div>

            <div className="cert-view-card">
                <div className="cert-view-header">
                    <div className="cert-view-icon"><RiAwardLine /></div>
                    <div>
                        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{cert.certName}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <StatusBadge status={cert.status} />
                            {days >= 0 ? (
                                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                                    {days === 0 ? '⚠ Expires today!' : `${days} days remaining`}
                                </span>
                            ) : (
                                <span style={{ fontSize: 13, color: 'var(--accent-red)' }}>
                                    Expired {Math.abs(days)} days ago
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="cert-details-grid">
                    <div className="cert-detail-item">
                        <label><RiBuildingLine style={{ marginRight: 4 }} /> Issuing Organization</label>
                        <span>{cert.issuedBy}</span>
                    </div>
                    <div className="cert-detail-item">
                        <label>Certificate ID</label>
                        <span style={{ fontFamily: 'monospace', fontSize: 13 }}>#{cert.certId.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="cert-detail-item">
                        <label><RiCalendarLine style={{ marginRight: 4 }} /> Issue Date</label>
                        <span>{formatDate(cert.issueDate)}</span>
                    </div>
                    <div className="cert-detail-item">
                        <label><RiCalendarLine style={{ marginRight: 4 }} /> Expiry Date</label>
                        <span style={{ color: cert.status === 'EXPIRED' ? 'var(--accent-red)' : cert.status === 'EXPIRING SOON' ? 'var(--accent-orange)' : 'var(--text-primary)' }}>
                            {formatDate(cert.expiryDate)}
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                {days >= 0 && (() => {
                    const total = Math.ceil((new Date(cert.expiryDate) - new Date(cert.issueDate)) / (1000 * 60 * 60 * 24));
                    const pct = Math.max(0, Math.min(100, (days / total) * 100));
                    const color = pct > 30 ? 'var(--accent-green)' : pct > 10 ? 'var(--accent-orange)' : 'var(--accent-red)';
                    return (
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                                <span>Validity remaining</span><span>{pct.toFixed(0)}%</span>
                            </div>
                            <div style={{ height: 6, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.6s ease' }} />
                            </div>
                        </div>
                    );
                })()}

                {/* File Preview / Download */}
                {cert.fileData ? (
                    <div className="file-preview-box">
                        <div style={{ fontSize: 32, marginBottom: 10 }}>
                            {cert.fileName?.endsWith('.pdf') ? '📄' : '🖼'}
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{cert.fileName}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Certificate file attached</div>

                        {cert.fileName && !cert.fileName.endsWith('.pdf') && (
                            <img src={cert.fileData} alt="Certificate" style={{
                                maxWidth: '100%', maxHeight: 300, borderRadius: 8,
                                border: '1px solid var(--border)', marginBottom: 16
                            }} />
                        )}

                        <a href={cert.fileData} download={cert.fileName} className="btn-primary-custom" style={{ display: 'inline-flex' }}>
                            <RiDownloadLine /> Download Certificate
                        </a>
                    </div>
                ) : (
                    <div className="file-preview-box">
                        <div style={{ fontSize: 36, marginBottom: 10, opacity: 0.4 }}>📎</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>No file uploaded for this certification</div>
                        <Link to="/add-certification" className="btn-secondary-custom" style={{ marginTop: 14, display: 'inline-flex' }}>
                            Upload Certificate File
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificateViewPage;
