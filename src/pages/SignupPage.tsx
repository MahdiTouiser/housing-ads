import { useState } from 'react';

import {
    Eye,
    EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
    Link,
    useNavigate,
} from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import useApi from '../hooks/useApi';

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const { callApi, loading } = useApi();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const newUser = { email, password };

        try {
            const response = await callApi('/register', {
                method: 'POST',
                data: newUser
            });

            if (response?.accessToken) {
                login(response.accessToken);
                navigate('/home');
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Signup failed.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-9 right-3 text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute top-9 right-3 text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span>Already have an account? </span>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
