import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

const AppRoutes = () => {
    const { token } = useAuth();

    return (
        <Routes>
            <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={token ? <Navigate to="/" replace /> : <LoginPage />} />
            <Route path="/signup" element={token ? <Navigate to="/" replace /> : <SignupPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
