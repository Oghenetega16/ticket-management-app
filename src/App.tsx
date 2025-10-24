import { useState, useEffect } from "react";
import { useAuth } from "./auth/useAuth";
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Dashboard from './components/Dashboard'
import TicketManagement from './components/TicketManagement'

export default function App() {
    const [currentPage, setCurrentPage] = useState('landing');
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user && currentPage === 'landing') {
                setCurrentPage('dashboard');
            } else if (!user && ['dashboard', 'tickets'].includes(currentPage)) {
                setCurrentPage('login');
            }
        }
    }, [user, loading, currentPage]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'landing':
                return <LandingPage onNavigate={setCurrentPage} />;
            case 'login':
                return <LoginPage onNavigate={setCurrentPage} />;
            case 'signup':
                return <SignupPage onNavigate={setCurrentPage} />;
            case 'dashboard':
                return user ? <Dashboard onNavigate={setCurrentPage} /> : <LoginPage onNavigate={setCurrentPage} />;
            case 'tickets':
                return user ? <TicketManagement onNavigate={setCurrentPage} /> : <LoginPage onNavigate={setCurrentPage} />;
            default:
                return <LandingPage onNavigate={setCurrentPage} />;
        }
    };

    return <div className="font-sans antialiased">{renderPage()}</div>;
};