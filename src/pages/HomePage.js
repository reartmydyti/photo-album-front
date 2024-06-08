import React, { useState, useEffect } from 'react';
import AlbumList from '../components/Album/AlbumList';
import SearchBar from '../components/Album/SearchBar';
import { searchAlbums } from '../api/api';
import Layout from '../components/Layout';
import AlbumForm from '../components/Album/AlbumForm';

const HomePage = () => {
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchAlbums('');
        if (response && response.success) {
          setFilteredAlbums(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async ({ searchTerm, categoryId }) => {
    try {
      const response = await searchAlbums(searchTerm, categoryId);
      console.log('Search albums:', response);
      setFilteredAlbums(response && response.success ? response.data || [] : []);
    } catch (error) {
      console.error('Error searching albums:', error);
    }
  };

  const handleSave = (album) => {
    setShowForm(false);
    setFilteredAlbums((prevAlbums) => [...prevAlbums, album]);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container">
          <AlbumList albums={filteredAlbums} />
          {showForm && (
            <div className="mt-4">
              <AlbumForm onSave={handleSave} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
