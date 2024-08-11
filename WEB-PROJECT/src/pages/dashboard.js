import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [cryptos, setCryptos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('/api/cryptocurrencies?query=bitcoin');
                setCryptos(response.data);
            } catch (error) {
                setError('Failed to fetch cryptocurrencies');
            } finally {
                setLoading(false);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axios.get('/api/user/favorites');
                setFavorites(response.data);
            } catch (error) {
                setError('Failed to load favorites');
            }
        };

        fetchCryptos();
        fetchFavorites();
    }, []);

    const addToFavorites = async (crypto) => {
        try {
            const response = await axios.post('/api/user/favorites', { cryptoId: crypto.id });
            setFavorites([...favorites, crypto]);
        } catch (error) {
            setError('Failed to add to favorites');
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="title">My Favorites</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {favorites.length > 0 ? (
                <div className="crypto-grid">
                    {favorites.map((crypto) => (
                        <div key={crypto.id} className="crypto-card">
                            <img src={crypto.image} alt={crypto.name} className="crypto-image" />
                            <h2 className="crypto-name">{crypto.name}</h2>
                            <p className="crypto-price">${crypto.quote?.USD?.price?.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorites added yet.</p>
            )}

            <h1 className="title">All Cryptocurrencies</h1>
            {loading ? (
                <p>Loading cryptocurrencies...</p>
            ) : (
                <div className="crypto-grid">
                    {cryptos.map((crypto) => (
                        <div key={crypto.id} className="crypto-card">
                            <img src={crypto.image} alt={crypto.name} className="crypto-image" />
                            <h2 className="crypto-name">{crypto.name}</h2>
                            <p className="crypto-price">${crypto.quote?.USD?.price?.toFixed(2)}</p>
                            <button onClick={() => addToFavorites(crypto)}>Add to Favorites</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
