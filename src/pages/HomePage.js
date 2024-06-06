import React, { useState } from 'react';
import AlbumList from '../components/Album/AlbumList';
import SearchBar from '../components/Album/SearchBar';
import { searchAlbums } from '../api/api';
import Layout from '../components/Layout';
import AlbumForm from '../components/Album/AlbumForm';

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token'); 

  const handleSearch = async ({ searchTerm, categoryId }) => {
    try {
      const response = await searchAlbums(searchTerm, categoryId);
      console.log('Search albums:', response);
      setAlbums(response && response.success ? response.data : []);
    } catch (error) {
      console.error('Error searching albums:', error);
    }
  };

  const handleSave = (album) => {
    setShowForm(false);
    setAlbums((prevAlbums) => [...prevAlbums, album]); 
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container">
          <div className="container pp-section">
            <div className="row">
              <div className="col-md-9 col-sm-12 px-0">
                <h1 className="h3">We are Photo Perfect, A Digital Photography Studio.</h1>
              </div>
        
            </div>
          </div>
          <SearchBar onSearch={handleSearch} />
          <AlbumList albums={albums} />
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
