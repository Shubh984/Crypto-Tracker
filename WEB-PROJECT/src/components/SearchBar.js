import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-1/2"
        placeholder="Search for a cryptocurrency..."
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 ml-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;