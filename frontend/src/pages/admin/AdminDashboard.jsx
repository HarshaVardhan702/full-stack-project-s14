import { useData } from '../../context/DataContext';
import StatsCard from '../../components/StatsCard';
import StatusBadge from '../../components/StatusBadge';
import { formatDate } from '../../utils/certUtils';
import { Link } from 'react-router-dom';
import {
    RiGroupLine, RiAwardLine, RiAlarmWarningLine,
    RiCloseCircleLine, RiArrowRightLine
} from 'react-icons/ri';

const AdminDashboard = () => {
    const { getAllCerts } = useData();
    const allCerts = getAllCerts();

    const totalUsers = [...new Set(allCerts.map(c => c.userId))].length;
    const totalCerts = allCerts.length;
    const expiring = allCerts.filter(c => c.status === 'EXPIRING SOON').length;
    const expired = allCerts.filter(c => c.status === 'EXPIRED').length;

    const recentExpiring = allCerts.filter(c => c.status !== 'ACTIVE').slice(0, 6);

    return (
        <div className="fade-up">
            <div className="page-header">
                <div>
                    <h1 className="page-title">⚡ Admin Dashboard</h1>
                    <p className="page-subtitle">System-wide certification overview</p>
                </div>
            </div>

            <div className="grid-stats">
                <StatsCard icon={<RiGroupLine />} value={totalUsers} label="Total Users" color="blue" />
                <StatsCard icon={<RiAwardLine />} value={totalCerts} label="Total Certifications" color="green" />
                <StatsCard icon={<RiAlarmWarningLine />} value={expiring} label="Expiring Soon" color="orange" />
                <StatsCard icon={<RiCloseCircleLine />} value={expired} label="Expired" color="purple" />
            </div>

            {(expiring + expired) > 0 && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(239,68,68,0.10), rgba(245,158,11,0.06))',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 20px',
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                }}>
                    <span style={{ fontSize: 24 }}>🚨</span>
                    <div>
                        <div style={{ fontWeight: 700, color: 'var(--accent-red)' }}>Action Required</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>
                            <strong style={{ color: '#f59e0b' }}>{expiring}</strong> certifications expiring soon &nbsp;·&nbsp;
                            <strong style={{ color: 'var(--accent-red)' }}>{expired}</strong> already expired
                        </div>
                    </div>
                    <Link to="/admin/expiring" className="btn-secondary-custom" style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                        View All <RiArrowRightLine />
                    </Link>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Attention Needed */}
                <div>
                    <div className="section-title">⚠ Needs Attention</div>
                    <div className="cert-table-wrapper">
                        <table>
                            <thead>
                                <tr><th>User</th><th>Certification</th><th>Expiry</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                {recentExpiring.length === 0 ? (
                                    <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 30 }}>All certifications are active ✓</td></tr>
                                ) : recentExpiring.map(c => (
                                    <tr key={c.certId}>
                                        <td style={{ fontWeight: 600, fontSize: 13 }}>{c.userName}</td>
                                        <td style={{ fontSize: 13 }}>{c.certName}</td>
                                        <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{formatDate(c.expiryDate)}</td>
                                        <td><StatusBadge status={c.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Stats Box */}
                <div>
                    <div className="section-title">📊 System Health</div>
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 24 }}>
                        {[
                            { label: 'Active Rate', value: totalCerts ? `${((allCerts.filter(c => c.status === 'ACTIVE').length / totalCerts) * 100).toFixed(0)}%` : '0%', color: 'var(--accent-green)' },
                            { label: 'Expiring Soon', value: totalCerts ? `${((expiring / totalCerts) * 100).toFixed(0)}%` : '0%', color: 'var(--accent-orange)' },
                            { label: 'Expired', value: totalCerts ? `${((expired / totalCerts) * 100).toFixed(0)}%` : '0%', color: 'var(--accent-red)' },
                        ].map(stat => (
                            <div key={stat.label} style={{ marginBottom: 20 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
                                    <span style={{ color: stat.color, fontWeight: 700 }}>{stat.value}</span>
                                </div>
                                <div style={{ height: 6, background: 'var(--bg-secondary)', borderRadius: 3 }}>
                                    <div style={{ width: stat.value, height: '100%', background: stat.color, borderRadius: 3 }} />
                                </div>
                            </div>
                        ))}

                        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
                            <Link to="/admin/certifications" className="btn-primary-custom" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }}>
                                All Certs
                            </Link>
                            <Link to="/admin/renewals" className="btn-secondary-custom" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }}>
                                Renewals
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
