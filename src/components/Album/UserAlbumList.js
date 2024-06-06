import React, { useEffect, useState } from 'react';
import { fetchAlbumsByUserId, fetchAlbumsByCategory, fetchCategories } from '../../api/api'; // Import the necessary functions
import { Link } from 'react-router-dom';

const UserAlbumList = ({ userId }) => {
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetchAlbumsByUserId(userId);
        console.log('Albums fetched:', response);
        
        if (response && response.success) {
          setAlbums(Array.isArray(response.data) ? response.data : []);
        } else {
          console.error('Unexpected response format:', response);
          setAlbums([]);
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const categoriesResponse = await fetchCategories();
        console.log('Categories fetched:', categoriesResponse);

        if (categoriesResponse && categoriesResponse.success) {
          setCategories(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
        } else {
          console.error('Unexpected response format for categories:', categoriesResponse);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchAlbumData();
    fetchCategoryData();
  }, [userId]);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const response = categoryId === null ? await fetchAlbumsByUserId(userId) : await fetchAlbumsByCategory(categoryId);
      setAlbums(response && response.success ? response.data : []);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };
  

  return (
    <div className="container px-0">
      <div className="pp-gallery">
        <div className="card-columns">
          {albums.length > 0 ? (
            albums.map(album => (
              <div key={album.id} className="card" data-groups={`["${album.category.name.toLowerCase()}"]`}>
                <Link to={`/album/${album.id}`}>
                  <figure className="pp-effect">
                    {album.photos.length > 0 && (
                      <img className="img-fluid" src={album.photos[0].url} alt={album.name} />
                    )}
                    <figcaption>
                      <div className="h4">{album.name}</div>
                      <p>{album.description}</p>
                    </figcaption>
                  </figure>
                </Link>
              </div>
            ))
          ) : (
            <p>No albums found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAlbumList;
