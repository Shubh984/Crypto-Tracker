import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(query ? `/api/search?q=${query}` : '/api/search');
        if (Array.isArray(response.data)) {
          const cryptosWithImages = response.data.map(crypto => ({
            ...crypto,
            image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`
          }));
          setCryptos(cryptosWithImages);
        } else {
          setError('Received unexpected data structure from server');
        }
      } catch (error) {
        setError('Failed to fetch cryptocurrency data');
      } finally {
        setLoading(false);
      }
    };
    fetchCryptos();
  }, [query]);

  const handleCardClick = (crypto) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Search Cryptocurrencies</h1>
        <div className="form-control mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a cryptocurrency..."
            className="input input-bordered input-primary w-full max-w-xs mx-auto"
          />
        </div>
        {loading && <progress className="progress progress-primary w-56 mt-4 mx-auto"></progress>}
        {error && <div className="alert alert-error mt-4">{error}</div>}
        <div className="crypto-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cryptos.length > 0 ? (
            cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="crypto-card bg-base-100 shadow-xl rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
                onClick={() => handleCardClick(crypto)}
              >
                <img src={crypto.image} alt={crypto.name} className="crypto-image w-16 h-16 mx-auto mt-4" />
                <div className="p-4">
                  <h2 className="crypto-name text-lg font-semibold text-center">{crypto.name}</h2>
                  <p className="crypto-price text-center mt-2">
                    Price: ${crypto.quote?.USD?.price?.toFixed(2) || 'N/A'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No results found. Try a different search term.</p>
          )}
        </div>
      </div>

      {isModalOpen && selectedCrypto && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100">
            <img src={selectedCrypto.image} alt={selectedCrypto.name} className="modal-image w-24 h-24 mx-auto" />
            <h2 className="modal-name text-2xl font-bold text-center mt-4">{selectedCrypto.name}</h2>
            <div className="modal-details mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Price:</span>
                <span>${selectedCrypto.quote?.USD?.price?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Market Cap:</span>
                <span>${selectedCrypto.quote?.USD?.market_cap?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">24h Volume:</span>
                <span>${selectedCrypto.quote?.USD?.volume_24h?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">24h Change:</span>
                <span className={selectedCrypto.quote?.USD?.percent_change_24h >= 0 ? 'text-success' : 'text-error'}>
                  {selectedCrypto.quote?.USD?.percent_change_24h?.toFixed(2) || 'N/A'}%
                </span>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;