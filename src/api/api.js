import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7001/api',
});

const authApi = axios.create({
  baseURL: 'https://localhost:7001',
});

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchAlbums = async () => {
  const response = await api.get('/Albums/GetAlbums', { headers: getAuthHeader() });
  return response.data;
};

export const fetchAlbumById = async (id) => {
  const response = await api.get(`/Albums/GetAlbumById/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const createAlbum = async (albumData) => {
  const response = await api.post('/Albums/CreateAlbum', albumData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeader(),
    },
  });
  return response.data;
};

export const updateAlbum = async (albumId, albumData) => {
  const response = await api.put(`/Albums/UpdateAlbum/${albumId}`, albumData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeader(),
    },
  });
  return response.data;
};

export const deleteAlbum = async (id) => {
  const response = await api.delete(`/Albums/DeleteAlbum/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const searchAlbums = async (searchTerm, categoryId) => {
  const params = {};
  if (searchTerm) params.searchTerm = searchTerm;
  if (categoryId) params.categoryId = categoryId;

  const response = await api.get('/Albums/SearchAlbums', { params, headers: getAuthHeader() });
  return response.data;
};

export const fetchAlbumsByCategory = async (categoryId) => {
  const response = await api.get(`/Albums/GetAlbumsByCategory/${categoryId}`, { headers: getAuthHeader() });
  return response.data;
};

export const fetchAlbumsByUserId = async (userId) => {
  try {
    const response = await api.get(`/Albums/GetAlbumsByUserId/${userId}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching albums by user ID:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/Categories/GetCategories', { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/Categories/GetCategory/${id}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post('/Categories/CreateCategory', categoryData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/Categories/UpdateCategory/${id}`, categoryData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/Categories/DeleteCategory/${id}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchLoggedInUser = async () => {
  try {
    const response = await api.get('/User/GetLoggedInUser', { headers: getAuthHeader() });
    console.log('fetchLoggedInUser response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching logged in user:', error);
    throw error;
  }
};


export const login = async (credentials) => {
  const response = await api.post('/User/Login', credentials);
  return response.data;
};

export const register = async (credentials) => {
  const response = await authApi.post('/register', credentials);
  return response.data;
};

export const fetchComments = async () => {
  const response = await api.get('/Comments/GetComments', { headers: getAuthHeader() });
  return response.data;
};

export const fetchCommentById = async (id) => {
  const response = await api.get(`/Comments/GetComment/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const createComment = async (commentData) => {
  const response = await api.post('/Comments/CreateComment', commentData, { headers: getAuthHeader() });
  return response.data;
};

export const updateComment = async (id, commentData) => {
  const response = await api.put(`/Comments/UpdateComment/${id}`, commentData, { headers: getAuthHeader() });
  return response.data;
};

export const deleteComment = async (id) => {
  await api.delete(`/Comments/DeleteComment/${id}`, { headers: getAuthHeader() });
};

export const fetchCommentsByAlbumId = async (albumId) => {
  const response = await api.get(`/Comments/GetCommentsByAlbumId/${albumId}`, { headers: getAuthHeader() });
  return response.data;
};

export const fetchCommentsByPhotoId = async (photoId) => {
  const response = await api.get(`/Comments/GetCommentsByPhotoId/${photoId}`, { headers: getAuthHeader() });
  return response.data;
};

export const fetchPhotos = async () => {
  const response = await api.get('/Photos/GetPhotos', { headers: getAuthHeader() });
  return response.data;
};

export const fetchPhotoById = async (id) => {
  const response = await api.get(`/Photos/GetPhoto/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const createPhoto = async (photoData) => {
  const response = await api.post('/Photos/CreatePhoto', photoData, { headers: getAuthHeader() });
  return response.data;
};

export const updatePhoto = async (photoId, photoData) => {
  const response = await api.put(`/Photos/UpdatePhoto/${photoId}`, photoData, { headers: getAuthHeader() });
  return response.data;
};

export const deletePhoto = async (id) => {
  const response = await api.delete(`/Photos/DeletePhoto/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const fetchRatings = async () => {
  const response = await api.get('/Rating/GetRatings', { headers: getAuthHeader() });
  return response.data;
};

export const fetchRatingById = async (id) => {
  const response = await api.get(`/Rating/GetRating/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const createRating = async (ratingDto) => {
  const response = await api.post('/Rating/CreateRating', ratingDto, { headers: getAuthHeader() });
  return response.data;
};

export const updateRating = async (id, ratingDto) => {
  const response = await api.put(`/Rating/UpdateRating/${id}`, ratingDto, { headers: getAuthHeader() });
  return response.data;
};

export const deleteRating = async (id) => {
  const response = await api.delete(`/Rating/DeleteRating/${id}`, { headers: getAuthHeader() });
  return response.data;
};


export const loginOrSignupWithGoogle = async (credential) => {
  try {
    const response = await authApi.post('/login-or-signup-google', credential);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
