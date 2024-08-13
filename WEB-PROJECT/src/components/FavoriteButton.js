import React, { useState, useEffect } from 'react';
import { addFavorite, removeFavorite } from '../lib/auth';

const FavoriteButton = ({ productId, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = async () => {
    try {
      if (favorite) {
        await removeFavorite(productId);
      } else {
        await addFavorite(productId);
      }
      setFavorite(!favorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <button onClick={handleFavoriteClick} className="favorite-button">
      {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
