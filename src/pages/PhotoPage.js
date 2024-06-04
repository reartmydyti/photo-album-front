import React from 'react';
import { useParams } from 'react-router-dom';

const PhotoPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Photo Page</h1>
      <p>Photo ID: {id}</p>
      {/* Add components or content for the photo page here */}
    </div>
  );
};

export default PhotoPage;
