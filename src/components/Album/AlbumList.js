import React, { useEffect, useState } from 'react';
import { fetchAlbums, fetchAlbumsByCategory, fetchCategories } from '../../api/api'; 
import { Link } from 'react-router-dom';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('none'); 

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetchAlbums();
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
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const response = categoryId === null ? await fetchAlbums() : await fetchAlbumsByCategory(categoryId);
      setAlbums(response && response.success ? response.data : []);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleSortClick = (order) => {
    setSortOrder(order);
    const sortedAlbums = [...albums].sort((a, b) => {
      if (order === 'lowToHigh') {
        return a.averageRating - b.averageRating;
      } else if (order === 'highToLow') {
        return b.averageRating - a.averageRating;
      } else {
        return 0; 
      }
    });
    setAlbums(sortedAlbums);
  };

  return (
    <div className="container px-0">
      <div className="pp-category-filter">
        <div className="row">
          <div className="col-sm-12">
            <button 
              className="btn btn-outline-primary pp-filter-button" 
              onClick={() => handleCategoryClick(null)}
            >
              All Albums
            </button>
            {categories.map(category => (
              <button
                key={category.id} 
                className="btn btn-outline-primary pp-filter-button" 
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="col-sm-12 mt-3">
          <button 
            className="btn btn-outline-secondary pp-sort-button"
            onClick={() => handleSortClick('lowToHigh')}
          >
            Sort by Rating: Low to High
          </button>
          <button 
            className="btn btn-outline-secondary pp-sort-button"
            onClick={() => handleSortClick('highToLow')}
          >
            Sort by Rating: High to Low
          </button>
        </div>
      </div>
      <div className="pp-gallery">
  <div className="row">
    {albums.length > 0 ? (
      albums.map(album => (
        <div key={album.id} className="col-md-4 mb-4">
          <div className="card">
            <Link to={`/album/${album.id}`}>
                  <figure className="pp-effect">
                  {album.photos.length > 0 && (
                    <img className="img-fluid album-image" src={album.photos[0].url} alt={album.name} />
                  )}
                  <figcaption>
                    <div className="h4">{album.name}</div>
                    <p className="description">{album.description}</p>
                    <p>Album Rating: {album.averageRating}</p>
                  </figcaption>
      </figure>

              <h6>{album.name}</h6>
              <span className="badge badge-primary">Rating: {album.averageRating}</span>
            </Link>
          </div>
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

export default AlbumList;
