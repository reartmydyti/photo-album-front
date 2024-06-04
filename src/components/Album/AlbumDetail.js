import React, { useEffect, useState } from 'react';
import { fetchAlbumById } from '../../api/api'; // Import fetchAlbumById function directly
import { useParams } from 'react-router-dom';

const AlbumDetail = () => {
  const { id } = useParams(); // Get the album ID from the route parameters
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetchAlbumById(id);
        console.log('Album response:', response); // Log response data
        setAlbum(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching album:', error);
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div>
      <h2>{album.name}</h2>
      <p>{album.description}</p>
      <h3>Photos</h3>
      <ul>
        {album.photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.url} alt={`Photo ${photo.id}`} />
          </li>
        ))}
      </ul>
      <h3>Comments</h3>
      <ul>
        {album.comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <h3>Ratings</h3>
      <p>Average Rating: {album.averageRating}</p>
      <ul>
        {album.ratings.map(rating => (
          <li key={rating.id}>Score: {rating.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetail;
