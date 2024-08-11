import React, { useEffect, useState } from 'react';
import { getFavorites } from '../lib/auth';
//import ProductCard from '../components/ProductCard'; 

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesList = await getFavorites();
        setFavorites(favoritesList);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-container">
      <h1 className="text-center text-3xl font-bold mb-6">Your Favorites</h1>
      <div className="favorites-grid">
        {favorites.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
