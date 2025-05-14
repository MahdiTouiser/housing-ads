import 'leaflet/dist/leaflet.css';

import {
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';
import {
  MapContainer,
  Marker,
  TileLayer,
} from 'react-leaflet';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import useApi from '../hooks/useApi';

const AdDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { callApi } = useApi();
    const [ad, setAd] = useState<any>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchAd = async () => {
            const data = await callApi(`/ads/${id}`);
            if (data) setAd(data);
        };
        fetchAd();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this ad?");
        if (!confirmed) return;
        await callApi(`/ads/${id}`, { method: 'DELETE' });
        toast.success('Ad deleted');
        navigate('/');
    };

    if (!ad) return <div>Loading...</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-2">{ad.address}</h2>
            <MapContainer center={[ad.lat, ad.lng]} zoom={13} style={{ height: '300px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[ad.lat, ad.lng]} />
            </MapContainer>
            <p className="mt-4"><strong>Phone:</strong> {ad.phone}</p>
            <p><strong>Description:</strong> {ad.description}</p>
            <div className="flex gap-4 mt-6">
                <button onClick={() => setShowEditModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>

            {/* {showEditModal && <EditAdModal ad={ad} onClose={() => setShowEditModal(false)} />} */}
        </div>
    );
};

export default AdDetail;
