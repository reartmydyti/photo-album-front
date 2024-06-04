import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, categoryId });
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
      />
      <input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Search by category"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
