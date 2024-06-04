import React, { useState } from 'react';
import api from '../../api/api';

const AlbumForm = ({ album, onSave }) => {
  const [name, setName] = useState(album ? album.name : '');
  const [description, setDescription] = useState(album ? album.description : '');
  // Add more fields as needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    const albumData = { name, description };
    try {
      let response;
      if (album) {
        response = await api.put(`/Albums/UpdateAlbum/${album.id}`, albumData);
      } else {
        response = await api.post('/Albums/CreateAlbum', albumData);
      }
      onSave(response.data.data);
    } catch (error) {
      console.error('Error saving album:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <input value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AlbumForm;
