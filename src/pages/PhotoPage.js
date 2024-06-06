import React from 'react';
import { useParams } from 'react-router-dom';
import PhotoDetail from '../components/Photo/PhotoDetail.js'; 

const PhotoPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <PhotoDetail id={id} />
    </div>
  );
};

export default PhotoPage;
