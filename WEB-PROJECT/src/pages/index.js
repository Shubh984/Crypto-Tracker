import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';  // Import Link from Next.js
import { useRouter } from 'next/router';  // Import useRouter for programmatic navigation

const HomePage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();  // Initialize useRouter

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('/api/cryptocurrencies?query=bitcoin');
        if (Array.isArray(response.data)) {
          setCryptos(response.data);
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
  }, []);

  const handleCardClick = (crypto) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
  };

  const handleExploreClick = () => {
    router.push('/search');  // Navigate to the search page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul className="nav-menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/search">Search</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Track the Future of Finance</h1>
          <p>Explore the latest trends and prices of top cryptocurrencies</p>
          <button className="cta-button" onClick={handleExploreClick}>Explore Markets</button>
        </div>
      </header>

      {/* Interactive Dashboard Section */}
      <section className="dashboard">
        <div className="dashboard-card">
          <h2>Live Market Data</h2>
          <p>Stay updated with real-time data</p>
          <div className="dashboard-metrics">
            <div className="metric">
              <h3>Total Market Cap</h3>
              <p>$1.5 Trillion</p>
            </div>
            <div className="metric">
              <h3>24h Volume</h3>
              <p>$100 Billion</p>
            </div>
            <div className="metric">
              <h3>Bitcoin Dominance</h3>
              <p>45%</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <h2>Top Movers</h2>
          <div className="crypto-grid">
            {cryptos.slice(0, 2).map((crypto) => (
              <div 
                key={crypto.id} 
                className="crypto-card" 
                onClick={() => handleCardClick(crypto)}
              >
                <img src={crypto.image} alt={crypto.name} className="crypto-image" />
                <h2 className="crypto-name">{crypto.name}</h2>
                <p className="crypto-price">
                  ${crypto.quote?.USD?.price?.toFixed(2) || 'N/A'}
                </p>
                <p className={`crypto-change ${crypto.quote?.USD?.percent_change_24h >= 0 ? 'positive' : 'negative'}`}>
                  {crypto.quote?.USD?.percent_change_24h?.toFixed(2) || 'N/A'}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="insights">
        <h2>Market Insights</h2>
        <div className="insights-content">
          <div className="insight-item">
            <h3>Technical Analysis</h3>
            <p>Deep dive into market patterns and predictions</p>
          </div>
          <div className="insight-item">
            <h3>News Updates</h3>
            <p>Latest news impacting the market</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Cryptocurrency Tracker</p>
      </footer>

      {/* Modal for Cryptocurrency Details */}
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

export default HomePage;
