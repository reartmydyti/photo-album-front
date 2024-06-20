import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLoggedInUser } from '../api/api';

const Layout = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetchLoggedInUser();
        if (user && user.userId) {
          localStorage.setItem('userId', user.userId);
          if (user.roleId) {
            localStorage.setItem('roleId', user.roleId);
          }
        } else {
          console.log('fetchLoggedInUser did not return userId');
        }
      } catch (error) {
        console.error('Error fetching logged in user:', error);
      }
    };

    if (isLoggedIn) {
      getUser();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    navigate('/');
  };

  const roleId = localStorage.getItem('roleId');

  return (
    <div>
      <header>
        <div className="pp-header">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <img src={`${process.env.PUBLIC_URL}/camera.png`} alt="Logo" />
              <Link className="navbar-brand" to="/">Photo Perfect</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                  {isLoggedIn ? (
                    <>
                      <li className="nav-item"><Link className="nav-link" to="/createAlbum">Create Album</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/dashboard">My Albums</Link></li>
                      {roleId === '1' && (
                        <li className="nav-item"><Link className="nav-link" to="/categories">Manage Categories</Link></li>
                      )}
                      <li className="nav-item"><button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button></li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="pp-footer">
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-md-12">
              <a className="pp-facebook btn btn-link" href="#"><i className="fab fa-facebook-f fa-2x" aria-hidden="true"></i></a>
              <a className="pp-twitter btn btn-link" href="#"><i className="fab fa-twitter fa-2x" aria-hidden="true"></i></a>
              <a className="pp-instagram btn btn-link" href="#"><i className="fab fa-instagram fa-2x" aria-hidden="true"></i></a>
              <a className="pp-pinterest btn btn-link" href="#"><i className="fab fa-pinterest fa-2x" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-12">
              <p>&copy; 2024 All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
