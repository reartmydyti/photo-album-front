import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, categoryId });
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
        aria-label="Search by name"
      />
      <input
        type="text"
        className="form-control"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Search by category"
        aria-label="Search by category"
      />
      <div className="input-group-append">
        <button className="btn btn-outline-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
