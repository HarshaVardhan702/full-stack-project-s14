import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('certUser');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const login = (email, password, role) => {
        const users = JSON.parse(localStorage.getItem('certUsers') || '[]');
        if (role === 'admin') {
            if (email === 'admin@certify.com' && password === 'admin123') {
                const adminUser = { userId: 'admin', name: 'System Admin', email, role: 'admin' };
                setUser(adminUser);
                localStorage.setItem('certUser', JSON.stringify(adminUser));
                return { success: true };
            }
            return { success: false, message: 'Invalid admin credentials' };
        }
        const found = users.find(u => u.email === email && u.password === password);
        if (found) {
            const { password: _, ...safeUser } = found;
            setUser(safeUser);
            localStorage.setItem('certUser', JSON.stringify(safeUser));
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('certUsers') || '[]');
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        const newUser = { userId: Date.now().toString(), name, email, password, role: 'user' };
        users.push(newUser);
        localStorage.setItem('certUsers', JSON.stringify(users));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('certUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
