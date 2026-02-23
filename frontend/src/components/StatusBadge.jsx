import { getCertStatus } from '../utils/certUtils';

const StatusBadge = ({ expiryDate, status: propStatus }) => {
    const status = propStatus || getCertStatus(expiryDate);
    const map = {
        'ACTIVE': 'badge-status badge-active',
        'EXPIRING SOON': 'badge-status badge-expiring',
        'EXPIRED': 'badge-status badge-expired',
        'APPROVED': 'badge-status badge-approved',
    };
    const labels = {
        'ACTIVE': '✓ Active',
        'EXPIRING SOON': '⚠ Expiring Soon',
        'EXPIRED': '✕ Expired',
        'APPROVED': '✓ Approved',
    };
    return <span className={map[status] || 'badge-status badge-active'}>{labels[status] || status}</span>;
};

export default StatusBadge;
