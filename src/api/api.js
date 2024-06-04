import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7001/api',
});

export const fetchAlbums = async () => {
  const response = await api.get('/Albums/GetAlbums');
  return response.data;
};

export const fetchAlbumById = async (id) => {
  const response = await api.get(`/Albums/GetAlbumById/${id}`);
  return response.data;
};

export const createAlbum = async (albumData) => {
  const response = await api.post('/Albums/CreateAlbum', albumData);
  return response.data;
};

export const updateAlbum = async (id, albumData) => {
  const response = await api.put(`/Albums/UpdateAlbum/${id}`, albumData);
  return response.data;
};

export const deleteAlbum = async (id) => {
  const response = await api.delete(`/Albums/DeleteAlbum/${id}`);
  return response.data;
};

export const searchAlbums = async (searchTerm, categoryId) => {
  const params = {};
  if (searchTerm) params.searchTerm = searchTerm;
  if (categoryId) params.categoryId = categoryId;

  const response = await api.get('/Albums/SearchAlbums', { params });
  return response.data;
};
