import React, { useState, useEffect } from 'react';
import { createAlbum, updateAlbum, fetchCategories } from '../../api/api';
import Layout from '../Layout';

const AlbumForm = ({ album, onSave }) => {
  const [name, setName] = useState(album ? album.name : '');
  const [description, setDescription] = useState(album ? album.description : '');
  const [categoryId, setCategoryId] = useState(album ? album.categoryId : '');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories();
        if (response && response.success) {
          setCategories(response.data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesData();
  }, []);

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

    try {
      let response;
      if (album) {
        response = await updateAlbum(album.id, albumData);
      } else {
        response = await createAlbum(albumData);
      }
      onSave(response.data);
    } catch (error) {
      console.error('Error saving album:', error);
    }
  };

  return (
    <Layout>
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
    </form>
    </Layout>
  );
};

export default AlbumForm;
