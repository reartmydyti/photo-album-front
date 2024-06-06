// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import PhotoPage from './pages/PhotoPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AlbumForm from './components/Album/AlbumForm';
import DashboardPage from './pages/DashboardPage'; // Import the DashboardPage component

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? Component : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
        <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createAlbum" element={<PrivateRoute element={<AlbumForm />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
