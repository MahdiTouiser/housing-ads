import type { JSX } from 'react';

import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import AdDetail from '../pages/AdDetail';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import PostAd from '../pages/PostAd';
import SignupPage from '../pages/SignupPage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    return token ? <Navigate to="/" replace /> : children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout><Home /></Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/post-ad"
                element={
                    <ProtectedRoute>
                        <Layout><PostAd /></Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ads/:id"
                element={
                    <ProtectedRoute>
                        <Layout><AdDetail /></Layout>
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;