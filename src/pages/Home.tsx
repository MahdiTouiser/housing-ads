import {
    useEffect,
    useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import useApi from '../hooks/useApi';

interface Ad {
    id: number;
    address: string;
}

const ADS_PER_PAGE = 6;

const Home = () => {
    const { callApi, loading } = useApi<Ad[]>();
    const [ads, setAds] = useState<Ad[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAds = async () => {
            const data = await callApi('/ads', { method: 'GET' });
            if (data) setAds(data);
        };

        fetchAds();
    }, [callApi]);

    const startIndex = (currentPage - 1) * ADS_PER_PAGE;
    const currentAds = ads.slice(startIndex, startIndex + ADS_PER_PAGE);
    const totalPages = Math.ceil(ads.length / ADS_PER_PAGE);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-4">Housing Ads</h2>

            {loading ? (
                <p>Loading ads...</p>
            ) : ads.length === 0 ? (
                <div className="text-center p-4 border rounded shadow">
                    <p className="text-lg">No ads available yet.</p>
                    <p>Start posting your ad by clicking below:</p>
                    <button
                        onClick={() => navigate('/post-ad')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Post an Ad
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {currentAds.map((ad) => (
                        <div
                            key={ad.id}
                            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/ads/${ad.id}`)}
                        >
                            <p className="font-medium text-lg">{ad.address}</p>
                        </div>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
