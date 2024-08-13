import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [cryptos, setCryptos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await fetch('/api/cryptocurrencies?query=bitcoin');
                if (!response.ok) {
                    throw new Error('Failed to fetch cryptocurrencies');
                }
                const data = await response.json();
                setCryptos(data);
                setError(null); // Reset error if fetching is successful
            } catch (error) {
                setError('Failed to fetch cryptocurrencies');
            } finally {
                setLoading(false);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user/favorites', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to load favorites');
                }
                const data = await response.json();
                setFavorites(data.favorites || []);
                setError(null); // Reset error if fetching is successful
            } catch (error) {
                setError('Failed to load favorites');
            }
        };

        fetchCryptos();
        fetchFavorites();
    }, []);

    const addToFavorites = async (crypto) => {
        if (favorites.find(fav => fav.id === crypto.id)) {
            setError('This cryptocurrency is already in your favorites');
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/user/favorites/${crypto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to add to favorites');
            }
            setFavorites([...favorites, crypto]);
            setError(null); // Reset error if the addition is successful
        } catch (error) {
            setError('Failed to add to favorites');
        }
    };

    return (
        <div className="min-h-screen bg-base-200 p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-primary">Crypto Dashboard</h1>
                
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-primary">My Favorites</h2>
                    {loading && <progress className="progress progress-primary w-56 mt-4 mx-auto"></progress>}
                    {error && <div className="alert alert-error mt-4">{error}</div>}
                    {favorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {favorites.map((crypto) => (
                                <div key={crypto.id} className="bg-base-100 shadow-xl rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow">
                                    <img src={crypto.image} alt={crypto.name} className="w-16 h-16 mx-auto mt-4" />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-center">{crypto.name}</h2>
                                        <p className="text-center mt-2">
                                            ${crypto.quote?.USD?.price?.toFixed(2) || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !loading && <p className="text-center">No favorites added yet.</p>
                    )}
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-6 text-primary">All Cryptocurrencies</h2>
                    {loading ? (
                        <progress className="progress progress-primary w-56 mt-4 mx-auto"></progress>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cryptos.map((crypto) => (
                                <div key={crypto.id} className="bg-base-100 shadow-xl rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow">
                                    <img src={crypto.image} alt={crypto.name} className="w-16 h-16 mx-auto mt-4" />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-center">{crypto.name}</h2>
                                        <p className="text-center mt-2">
                                            ${crypto.quote?.USD?.price?.toFixed(2) || 'N/A'}
                                        </p>
                                        <div className="mt-4 text-center">
                                            <button 
                                                className="btn btn-primary"
                                                onClick={() => addToFavorites(crypto)}
                                            >
                                                Add to Favorites
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
