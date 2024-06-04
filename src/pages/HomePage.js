import React, { useState } from 'react';
import AlbumList from '../components/Album/AlbumList';
import SearchBar from '../components/Album/SearchBar';
import { searchAlbums } from '../api/api'; // Correctly import the named export

const HomePage = () => {
  const [albums, setAlbums] = useState([]);

  const handleSearch = async ({ searchTerm, categoryId }) => {
    try {
      const response = await searchAlbums(searchTerm, categoryId); // Use the searchAlbums function directly
      setAlbums(response.data);
    } catch (error) {
      console.error('Error searching albums:', error);
    }
  };

  return (
    <div>
      <h1>Photo Albums</h1>
      <SearchBar onSearch={handleSearch} />
      <AlbumList albums={albums} /> {/* Pass the albums to AlbumList component */}
    </div>
  );
};

export default HomePage;
