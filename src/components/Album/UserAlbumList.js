import React, { useEffect, useState } from 'react';
import { fetchAlbumsByUserId, fetchAlbumsByCategory, fetchCategories, deleteAlbum, updateAlbum } from '../../api/api'; 
import { Link } from 'react-router-dom';

const UserAlbumList = ({ userId }) => {
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

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

  const handleDelete = async (albumId) => {
    try {
      await deleteAlbum(albumId);
      setAlbums(albums.filter(album => album.id !== albumId));
      setAlert({ message: 'Album deleted successfully', type: 'success' });
    } catch (error) {
      console.error('Error deleting album:', error);
      setAlert({ message: 'Error deleting album', type: 'danger' });
    }
  };

  const handleEdit = (album) => {
    setEditingAlbum(album);
  };

  const handleSave = async (albumId, albumData) => {
    try {
      await updateAlbum(albumId, albumData);
      window.location.reload();
    } catch (error) {
      console.error('Error updating album:', error);
      setAlert({ message: 'Error updating album', type: 'danger' });
    }
  };
  

  const handleCancelEdit = () => {
    setEditingAlbum(null);
  };

  return (
    <div className="container px-0">
      <div className="pp-gallery">
        {alert.message && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <div className="row">
          {albums.length > 0 ? (
            albums.map(album => (
              <div key={album.id} className="col-md-12 mb-3">
                {editingAlbum && editingAlbum.id === album.id ? (
                  <AlbumEditForm album={album} categories={categories} onSave={handleSave} onCancel={handleCancelEdit} />
                ) : (
                  <div className="card h-100">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <Link to={`/album/${album.id}`}>
                          {album.photos.length > 0 && (
                            <img className="card-img" src={album.photos[0].url} alt={album.name} />
                          )}
                        </Link>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{album.name}</h5>
                          <p className="card-text">{album.description}</p>
                          <div className="d-flex justify-content-between">
                            <Link to={`/album/${album.id}`} className="btn btn-primary">View Album</Link>
                            <button onClick={() => handleEdit(album)} className="btn btn-secondary">Edit</button>
                            <button onClick={() => handleDelete(album.id)} className="btn btn-danger">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                )}
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

const AlbumEditForm = ({ album, categories, onSave, onCancel }) => {
  const [name, setName] = useState(album.name);
  const [description, setDescription] = useState(album.description);
  const [categoryId, setCategoryId] = useState(album.categoryId);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const albumData = new FormData();
    albumData.append('name', name);
    albumData.append('description', description);
    albumData.append('categoryId', categoryId);
    albumData.append('userId', '');

    for (let i = 0; i < images.length; i++) {
      albumData.append('photos', images[i]);
    }

    await onSave(album.id, albumData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoryId">Category</label>
        <select
          className="form-control"
          id="categoryId"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="images">Images</label>
        <input
          type="file"
          className="form-control-file"
          id="images"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
      <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UserAlbumList;
