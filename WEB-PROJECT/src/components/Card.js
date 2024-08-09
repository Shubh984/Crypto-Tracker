import React from 'react';

const Card = ({ name, price, image }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <img src={image} alt={name} className="w-full h-32 object-cover mb-4" />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">${price}</p>
    </div>
  );
};

export default Card;
