import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchCommentsByAlbumId, createComment, createRating } from '../../api/api';
import Layout from '../../components/Layout.js';

const AlbumDetail = () => {
  const { id } = useParams(); 
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

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

    const fetchComments = async () => {
      try {
        const response = await fetchCommentsByAlbumId(id);
        console.log('Comments response:', response); 
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchAlbumData();
    fetchComments();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    const commentData = {
      id: 0,
      content: newComment,
      albumId: parseInt(id),
      userId: ''
    };

    try {
      const response = await createComment(commentData);
      console.log('Comment created:', response);
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleRatingSubmit = async () => {
    const ratingDto = {
      id: 0,
      score: rating,
      userId: '',
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
            {album.photos.map(photo => (
              <div key={photo.id} className="col-md-4 mb-4">
                <a href={`/photo/${photo.id}`}>
                  <img className="img-fluid" src={photo.url} alt={`Photo ${photo.id}`} />
                </a>
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
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>{comment.content}</li>
              ))}
            </ul>
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
              <button type="submit" className="btn btn-primary">Post Comment</button>
            </form>
            <div className="mt-4">
              <p>Rate this album:</p>
              <div className="rating">
                {[...Array(10)].map((_, index) => (
                  <button 
                    key={index + 1}
                    onClick={() => setRating(index + 1)}
                    className={index + 1 === rating ? 'active' : ''}
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

export default AlbumDetail;
