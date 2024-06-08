import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { fetchAlbums, fetchAlbumsByCategory, fetchCategories } from '../../api/api';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import debounce from 'lodash.debounce';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [sortOrder, setSortOrder] = useState('none');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumsResponse, categoriesResponse] = await Promise.all([
          fetchAlbums(),
          fetchCategories()
        ]);

        if (albumsResponse && albumsResponse.success) {
          setAlbums(Array.isArray(albumsResponse.data) ? albumsResponse.data : []);
        }

        if (categoriesResponse && categoriesResponse.success) {
          setCategories(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = useCallback(async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      const response = categoryId === null ? await fetchAlbums() : await fetchAlbumsByCategory(categoryId);
      setAlbums(response && response.success ? response.data || [] : []);
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSortClick = useCallback((order) => {
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
  }, [albums]);

  const handleSearch = useMemo(() => debounce(({ searchTerm, categoryId }) => {
    setSelectedCategory(categoryId);
    let filtered = albums;

    if (searchTerm) {
      filtered = filtered.filter(album =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryId) {
      filtered = filtered.filter(album => album.categoryId === parseInt(categoryId));
    }

    setFilteredAlbums(filtered);
  }, 300), [albums]);

  useEffect(() => {
    setFilteredAlbums(albums);
  }, [albums]);

  return (
    <div className="container px-0">
      <SearchBar onSearch={handleSearch} />
      <div className="pp-category-filter">
        <div className="row">
          <div className="col-sm-12">
            <button 
              className="btn btn-outline-primary pp-filter-button mr-2" 
              onClick={() => handleCategoryClick(null)}
            >
              All Albums
            </button>
            {categoriesLoading ? (
              <p>Loading categories...</p>
            ) : (
              categories.map(category => (
                <button
                  key={category.id} 
                  className="btn btn-outline-primary pp-filter-button mr-2" 
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))
            )}
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
              className="btn btn-outline-secondary pp-sort-button ml-2"
              onClick={() => handleSortClick('highToLow')}
            >
              Sort by Rating: High to Low
            </button>
        </div>
      </div>
      <div className="pp-gallery mt-4">
        <div className="row">
          {loading ? (
            <p>Loading albums...</p>
          ) : filteredAlbums.length > 0 ? (
            filteredAlbums.map(album => (
              <div key={album.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-img-container">
                    <Link to={`/album/${album.id}`}>
                      {album.photos.length > 0 && (
                        <img className="card-img-top" src={`${album.photos[0].url}?quality=low`} alt={album.name} />
                      )}
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{album.name}</h5>
                    <p className="card-text">{album.description}</p>
                    <p className="card-text">
                      <span className="badge badge-primary">Rating: {album.averageRating}</span>
                    </p>
                  </div>
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

export default memo(AlbumList);
