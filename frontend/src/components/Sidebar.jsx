import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    RiDashboardLine, RiAwardLine, RiAddCircleLine,
    RiUserLine, RiShieldLine, RiFileList3Line,
    RiAlarmWarningLine, RiRefreshLine, RiLogoutBoxLine
} from 'react-icons/ri';

const userNav = [
    { to: '/dashboard', icon: <RiDashboardLine />, label: 'Dashboard' },
    { to: '/certifications', icon: <RiAwardLine />, label: 'My Certifications' },
    { to: '/add-certification', icon: <RiAddCircleLine />, label: 'Add Certification' },
];

const adminNav = [
    { to: '/admin/dashboard', icon: <RiDashboardLine />, label: 'Admin Dashboard' },
    { to: '/admin/certifications', icon: <RiFileList3Line />, label: 'All Certifications' },
    { to: '/admin/expiring', icon: <RiAlarmWarningLine />, label: 'Expiring Certs' },
    { to: '/admin/renewals', icon: <RiRefreshLine />, label: 'Renewal Management' },
];

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = user?.role === 'admin' ? adminNav : userNav;
    const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">
                    <div className="brand-icon">🎓</div>
                    <span className="brand-name">CertifyPro</span>
                </div>
            </div>

            <div className="sidebar-user">
                <div className="user-avatar">{initials}</div>
                <div className="user-info">
                    <div className="user-name">{user?.name}</div>
                    <div className="user-role">{user?.role === 'admin' ? '⚡ Admin' : '👤 User'}</div>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section-title">
                    {user?.role === 'admin' ? 'Admin Panel' : 'My Space'}
                </div>
                {navLinks.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{link.icon}</span>
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item" onClick={handleLogout} style={{ color: '#ef4444' }}>
                    <span className="nav-icon"><RiLogoutBoxLine /></span>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
