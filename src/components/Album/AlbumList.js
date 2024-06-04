import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../../api/api'; // Import fetchAlbums function directly
import { Link } from 'react-router-dom';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetchAlbums();
        setAlbums(response.data); 
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbumData();
  }, []);

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
