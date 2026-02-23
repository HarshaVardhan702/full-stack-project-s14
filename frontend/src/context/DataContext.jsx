import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCertStatus } from '../utils/certUtils';

const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

const SEED_CERTS = [
    {
        certId: 'c1', userId: 'u1', certName: 'AWS Solutions Architect', issuedBy: 'Amazon Web Services',
        issueDate: '2023-06-01', expiryDate: '2024-06-01', fileName: null, fileData: null,
    },
    {
        certId: 'c2', userId: 'u1', certName: 'PMP Certification', issuedBy: 'PMI',
        issueDate: '2024-01-15', expiryDate: '2026-04-01', fileName: null, fileData: null,
    },
    {
        certId: 'c3', userId: 'u2', certName: 'Google Cloud Professional', issuedBy: 'Google',
        issueDate: '2024-03-01', expiryDate: '2026-03-15', fileName: null, fileData: null,
    },
    {
        certId: 'c4', userId: 'u2', certName: 'Scrum Master CSM', issuedBy: 'Scrum Alliance',
        issueDate: '2023-11-01', expiryDate: '2025-11-01', fileName: null, fileData: null,
    },
    {
        certId: 'c5', userId: 'u1', certName: 'Azure Administrator', issuedBy: 'Microsoft',
        issueDate: '2024-05-01', expiryDate: '2026-05-01', fileName: null, fileData: null,
    },
];

const SEED_USERS = [
    { userId: 'u1', name: 'Rahul Sharma', email: 'rahul@example.com', password: 'rahul123', role: 'user' },
    { userId: 'u2', name: 'Priya Patel', email: 'priya@example.com', password: 'priya123', role: 'user' },
];

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [certs, setCerts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Seed users if none exist
        const storedUsers = JSON.parse(localStorage.getItem('certUsers') || '[]');
        if (storedUsers.length === 0) {
            localStorage.setItem('certUsers', JSON.stringify(SEED_USERS));
            setUsers(SEED_USERS);
        } else {
            setUsers(storedUsers);
        }
        // Seed certs if none exist
        const storedCerts = JSON.parse(localStorage.getItem('certCerts') || '[]');
        if (storedCerts.length === 0) {
            localStorage.setItem('certCerts', JSON.stringify(SEED_CERTS));
            setCerts(SEED_CERTS);
        } else {
            setCerts(storedCerts);
        }
    }, []);

    const saveCerts = (updated) => {
        setCerts(updated);
        localStorage.setItem('certCerts', JSON.stringify(updated));
    };

    const addCertification = (cert) => {
        const newCert = { ...cert, certId: Date.now().toString(), userId: user.userId };
        const updated = [...certs, newCert];
        saveCerts(updated);
        return newCert;
    };

    const getMyCerts = () => {
        return certs
            .filter(c => c.userId === user?.userId)
            .map(c => ({ ...c, status: getCertStatus(c.expiryDate) }));
    };

    const getAllCerts = () => {
        const allUsers = JSON.parse(localStorage.getItem('certUsers') || '[]');
        return certs.map(c => {
            const owner = allUsers.find(u => u.userId === c.userId);
            return { ...c, status: getCertStatus(c.expiryDate), userName: owner?.name || 'Unknown' };
        });
    };

    const getExpiringCerts = (filter) => {
        const all = getAllCerts();
        if (filter === 'expired') return all.filter(c => c.status === 'EXPIRED');
        if (filter === '30days') return all.filter(c => c.status === 'EXPIRING SOON');
        return all.filter(c => c.status !== 'ACTIVE');
    };

    const updateCertStatus = (certId, renewalStatus) => {
        const updated = certs.map(c => c.certId === certId ? { ...c, renewalStatus } : c);
        saveCerts(updated);
    };

    const getCertById = (certId) => {
        const c = certs.find(c => c.certId === certId);
        if (!c) return null;
        return { ...c, status: getCertStatus(c.expiryDate) };
    };

    const allUsers = JSON.parse(localStorage.getItem('certUsers') || '[]');

    return (
        <DataContext.Provider value={{
            certs, users: allUsers, addCertification, getMyCerts,
            getAllCerts, getExpiringCerts, updateCertStatus, getCertById
        }}>
            {children}
        </DataContext.Provider>
    );
};
