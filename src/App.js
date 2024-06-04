
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import PhotoPage from './pages/PhotoPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
