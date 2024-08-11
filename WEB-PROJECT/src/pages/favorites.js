// src/pages/favorites.js
import React from 'react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../store';

const Favorites = () => {
  const [favorites] = useAtom(favoritesAtom);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((fav) => (
            <li key={fav}>{fav}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
