import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RiUserLine, RiShieldLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const LoginPage = () => {
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTimeout(() => {
            const result = login(email, password, role);
            if (result.success) {
                navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard');
            } else {
                setError(result.message);
            }
            setLoading(false);
        }, 600);
    };

    const fillDemo = () => {
        if (role === 'admin') { setEmail('admin@certify.com'); setPassword('admin123'); }
        else { setEmail('rahul@example.com'); setPassword('rahul123'); }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card fade-up">
                <div className="auth-logo">
                    <div className="brand-icon" style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#4f8ef7,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎓</div>
                    <span style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg,#4f8ef7,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CertifyPro</span>
                </div>

                <h2 className="auth-title">Welcome back</h2>
                <p className="auth-subtitle">Sign in to manage your certifications</p>

                <div className="role-toggle">
                    <button className={`role-btn ${role === 'user' ? 'active' : ''}`} onClick={() => setRole('user')}>
                        <RiUserLine /> User
                    </button>
                    <button className={`role-btn ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>
                        <RiShieldLine /> Admin
                    </button>
                </div>

                {error && <div className="auth-error">⚠ {error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16 }}><RiMailLine /></span>
                            <input className="form-input" style={{ paddingLeft: 42 }} type="email" placeholder="you@example.com"
                                value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16 }}><RiLockLine /></span>
                            <input className="form-input" style={{ paddingLeft: 42, paddingRight: 42 }}
                                type={showPwd ? 'text' : 'password'} placeholder="••••••••"
                                value={password} onChange={e => setPassword(e.target.value)} required />
                            <button type="button" onClick={() => setShowPwd(!showPwd)}
                                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>
                                {showPwd ? <RiEyeOffLine /> : <RiEyeLine />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary-custom w-100" disabled={loading}
                        style={{ justifyContent: 'center', padding: '13px', marginTop: 8 }}>
                        {loading ? '⏳ Signing in...' : '🔐 Sign In'}
                    </button>
                </form>

                <button onClick={fillDemo} className="btn-secondary-custom w-100" style={{ justifyContent: 'center', marginTop: 10 }}>
                    ✨ Fill Demo Credentials
                </button>

                <div className="auth-link">
                    Don't have an account? <Link to="/register">Create one</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
