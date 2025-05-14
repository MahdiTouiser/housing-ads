import 'leaflet/dist/leaflet.css';

import { useState } from 'react';

import L from 'leaflet';
import {
    MapContainer,
    Marker,
    TileLayer,
    useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import useApi from '../hooks/useApi';

const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const LocationPicker = ({ onSelect }: { onSelect: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

const PostAd = () => {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();


    const { callApi, loading } = useApi();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!coords) {
            return alert('Please select a location on the map.');
        }

        const adData = {
            phone,
            address,
            description,
            lat: coords.lat,
            lng: coords.lng,
        };

        await callApi('/ads', {
            method: 'POST',
            data: adData,
        });

        setPhone('');
        setAddress('');
        setDescription('');
        setCoords(null);

        navigate('/');

    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Post an Ad</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="h-64 w-full rounded overflow-hidden">
                    <MapContainer center={[35.6892, 51.3890]} zoom={12} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationPicker onSelect={(lat, lng) => setCoords({ lat, lng })} />
                        {coords && <Marker position={[coords.lat, coords.lng]} icon={markerIcon} />}
                    </MapContainer>
                </div>

                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Ad'}
                </button>
            </form>
        </div>
    );
};

export default PostAd;
