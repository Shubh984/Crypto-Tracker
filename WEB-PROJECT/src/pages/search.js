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
        console.log('Fetched Data:', response.data);

        if (Array.isArray(response.data)) {
          const cryptosWithImages = response.data.map(crypto => ({
            ...crypto,
            image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`
          }));
          console.log('Cryptos with Images:', cryptosWithImages); // Debugging log
          setCryptos(cryptosWithImages);
        } else {
          console.error('Unexpected data structure:', response.data);
          setError('Received unexpected data structure from server');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
    <div className="form-container">
      <h1>Search Cryptocurrencies</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a cryptocurrency..."
        className="search-input"
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="crypto-grid">
        {cryptos.length > 0 ? (
          cryptos.map((crypto) => (
            <div
              key={crypto.id}
              className="crypto-card"
              onClick={() => handleCardClick(crypto)}
            >
              <img src={crypto.image} alt={crypto.name} className="crypto-image" />
              <h2 className="crypto-name">{crypto.name}</h2>
              <p className="crypto-price">
                Price: ${crypto.quote?.USD?.price?.toFixed(2) || 'N/A'}
              </p>
            </div>
          ))
        ) : (
          <p>No results found. Try a different search term.</p>
        )}
      </div>

      {isModalOpen && selectedCrypto && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCrypto.image} alt={selectedCrypto.name} className="modal-image" />
            <h2 className="modal-name">{selectedCrypto.name}</h2>
            <div className="modal-details">
              <div className="modal-detail-item">
                <span className="modal-label">Price:</span>
                <span className="modal-value">${selectedCrypto.quote?.USD?.price?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="modal-detail-item">
                <span className="modal-label">Market Cap:</span>
                <span className="modal-value">${selectedCrypto.quote?.USD?.market_cap?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="modal-detail-item">
                <span className="modal-label">24h Volume:</span>
                <span className="modal-value">${selectedCrypto.quote?.USD?.volume_24h?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="modal-detail-item">
                <span className="modal-label">24h Change:</span>
                <span className={`modal-value ${selectedCrypto.quote?.USD?.percent_change_24h >= 0 ? 'positive' : 'negative'}`}>
                  {selectedCrypto.quote?.USD?.percent_change_24h?.toFixed(2) || 'N/A'}%
                </span>
              </div>
            </div>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
