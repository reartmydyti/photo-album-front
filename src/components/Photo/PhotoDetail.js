import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPhotoById, fetchCommentsByPhotoId, createComment } from '../../api/api';
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

    const fetchComments = async () => {
      try {
        const response = await fetchCommentsByPhotoId(id);
        console.log('Comments response:', response);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPhotoData();
    fetchComments();
  }, [id]);

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
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhotoDetail;
