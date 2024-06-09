import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchCommentsByAlbumId, createComment, createRating, deleteComment, deletePhoto, downloadPhoto } from '../../api/api';
import Layout from '../../components/Layout.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetchAlbumById(id);
        console.log('Album response:', response);
        setAlbum(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching album:', error);
        setLoading(false);
      }
    };

    fetchAlbumData();
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await fetchCommentsByAlbumId(id);
      console.log('Comments response:', response);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleDownloadPhoto = async (photoId, photoUrl) => {
    try {
      await downloadPhoto(photoId); 
    } catch (error) {
      console.error('Error downloading photo:', error);
    }
  };


  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage('You must be logged in to post a comment.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    const commentData = {
      id: 0,
      content: newComment,
      albumId: parseInt(id),
      userId: userId,
    };

    try {
      const response = await createComment(commentData);
      console.log('Comment created:', response);
      fetchComments();
      setNewComment('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleRatingSubmit = async () => {
    if (!userId) {
      setErrorMessage('You must be logged in to rate the album.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }
  
    const ratingDto = {
      id: 0,
      score: rating,
      userId: userId,
      albumId: parseInt(id),
    };
  
    try {
      await createRating(ratingDto);
      console.log('Rating created');
      window.location.reload();
    } catch (error) {
      console.error('Error creating rating:', error);
    }
  };
  

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await deletePhoto(photoId);
      setAlbum((prevAlbum) => ({
        ...prevAlbum,
        photos: prevAlbum.photos.filter(photo => photo.id !== photoId)
      }));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="container pp-section">
          <div className="h3 font-weight-normal">{album.name}</div>
          <div className="row">
            {album.photos.map((photo) => (
              <div key={photo.id} className="col-md-4 mb-4">
                <div className="position-relative">
                  <a href={`/photo/${photo.id}`}>
                    <img className="img-fluid" src={photo.url} alt={`Photo ${photo.id}`} />
                  </a>
                  <button onClick={() => handleDownloadPhoto(photo.id, photo.url)} className="btn btn-primary mt-2 mr-2">
                    Download
                  </button>
                  {album.userId === userId && (
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="btn btn-danger mt-2"
                    >
                      Delete Photo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-5">
            <div className="col-md-3">
              <div className="h4">Category</div>
              {album.category && <span className="badge badge-primary">{album.category.name}</span>}
            </div>
            <div className="col-md-9">
              <div className="h4">Description</div>
              <p>{album.description}</p>
            </div>
            <div className="col-md-9">
              <div className="h4">Rating</div>
              <p>{album.averageRating}</p>
            </div>
          </div>
          <hr />
          <div className="container">
            <h4>Comments</h4>
            <div className="comments-container">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-box">
                  <div className="comment-header">
                    {comment.user ? (
                      <strong className="comment-user-name">
                        {comment.user.firstName} {comment.user.lastName}
                      </strong>
                    ) : (
                      <strong className="comment-user-name">Unknown User</strong>
                    )}
                    <span className="comment-date">{formatDate(comment.datePosted)}</span>
                    {comment.userId === userId && (
                      <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-danger ml-2">
                        Delete
                      </button>
                    )}
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              ))}
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmitComment}>
              <div className="form-group">
                <label htmlFor="newComment">New Comment</label>
                <textarea
                  className="form-control"
                  id="newComment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </form>
            <div className="mt-4">
              <p>Rate this album:</p>
              <div className="rating">
                {[...Array(10)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setRating(index + 1)}
                    className={index + 1 === rating ? 'active' : 'btn btn-outline-primary mr-1'}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button onClick={handleRatingSubmit} className="btn btn-primary mt-2">Rate</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const formatDate = (dateString) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default AlbumDetail;

