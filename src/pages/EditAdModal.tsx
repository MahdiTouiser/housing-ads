import {
    useEffect,
    useState,
} from 'react';

import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from 'react-leaflet';

interface EditAdModalProps {
    ad: {
        id: number;
        address: string;
        description: string;
        phone: string;
        lat: number;
        lng: number;
    };
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedAd: { address: string; description: string; phone: string; lat: number; lng: number }) => void;
}

const EditAdModal = ({ ad, isOpen, onClose, onSave }: EditAdModalProps) => {
    const [formData, setFormData] = useState({
        address: ad.address,
        description: ad.description,
        phone: ad.phone,
        lat: ad.lat,
        lng: ad.lng,
    });

    useEffect(() => {
        setFormData({
            address: ad.address,
            description: ad.description,
            phone: ad.phone,
            lat: ad.lat,
            lng: ad.lng,
        });
    }, [ad]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    // Handle map click event using useMapEvents
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setFormData(prevData => ({
                    ...prevData,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                }));
            },
        });
        return null;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg z-70">
                <h3 className="text-2xl font-bold mb-4">Edit Ad</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-semibold">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-semibold">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-semibold">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Select Location on Map</label>
                        <MapContainer
                            center={[formData.lat, formData.lng]}
                            zoom={16}
                            style={{ height: '300px' }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[formData.lat, formData.lng]}>
                                <Popup>{formData.address}</Popup>
                            </Marker>
                            <MapClickHandler />
                        </MapContainer>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default EditAdModal;
