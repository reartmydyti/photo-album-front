import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPhotoById, fetchCommentsByPhotoId, createComment, deleteComment } from '../../api/api';
import Layout from '../../components/Layout.js';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPhotoData = async () => {
      try {
        const response = await fetchPhotoById(id);
        console.log('Photo response:', response);
        setPhoto(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photo:', error);
        setLoading(false);
      }
    };

    fetchPhotoData();
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await fetchCommentsByPhotoId(id);
      console.log('Comments response:', response);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    const commentData = {
      id: 0,
      content: newComment,
      photoId: parseInt(id),
      userId: '' 
    };

    try {
      const response = await createComment(commentData);
      console.log('Comment created:', response);
      fetchComments();
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="container pp-section">
          <div className="h3 font-weight-normal text-center">Photo Details</div>
          <div className="row justify-content-center">
            <div className="col-md-8 mb-4 text-center">
              <img className="img-fluid" src={photo.url} alt={`Photo ${photo.id}`} />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h4>Comments</h4>
              <div className="comments-container"> 
                {comments.map(comment => (
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
                      <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-danger ml-2">
                        Delete
                      </button>
                    </div>
                    <div className="comment-content">{comment.content}</div>
                  </div>
                ))}
              </div>
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

export default PhotoDetail;
