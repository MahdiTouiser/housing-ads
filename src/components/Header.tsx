import {
    Moon,
    Sun,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
    const { toggleTheme, theme } = useTheme();

    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Housing Ads</h1>
                <nav className="flex items-center">
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-gray-400 transition duration-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/post-ad" className="hover:text-gray-400 transition duration-300">Post Ad</Link>
                        </li>
                    </ul>
                    <button onClick={toggleTheme} className="ml-6 p-2 bg-transparent hover:bg-gray-700 rounded-md transition duration-300 focus:outline-none">
                        {theme === 'light' ? (
                            <Sun className="h-6 w-6 text-yellow-500" />
                        ) : (
                            <Moon className="h-6 w-6 text-blue-500" />
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;