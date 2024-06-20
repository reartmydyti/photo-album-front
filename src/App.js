import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import PhotoPage from './pages/PhotoPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AlbumForm from './components/Album/AlbumForm';
import DashboardPage from './pages/DashboardPage'; 
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CategoryPage from './pages/CategoryPage';

// Define PrivateRoute component
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const roleId = localStorage.getItem('roleId');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (rest.role && roleId !== rest.role) {
    return <Navigate to="/" />;
  }

  return element;
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/categories" element={<PrivateRoute element={<CategoryPage />} role="1" />} />
      </Routes>
    </Router>
  );
}

export default App;
