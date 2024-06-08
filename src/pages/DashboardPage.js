import React, { useState, useEffect } from 'react';
import { fetchAlbumsByUserId } from '../api/api';
import UserAlbumList from '../components/Album/UserAlbumList';
import Layout from '../components/Layout';
import { jwtDecode } from 'jwt-decode'; 

const DashboardPage = () => {
  const [albums, setAlbums] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userIdFromToken = decodedToken.userId || decodedToken.id;
      setUserId(userIdFromToken);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserAlbums(userId);
    }
  }, [userId]);

  const fetchUserAlbums = async (userId) => {
    try {
      const albumsData = await fetchAlbumsByUserId(userId);
      setAlbums(albumsData);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="mt-5">Dashboard</h1>
        <h2 className="mt-3">Your Albums</h2>
        <UserAlbumList userId={userId} albums={albums} />
      </div>
    </Layout>
  );
};

export default DashboardPage;
