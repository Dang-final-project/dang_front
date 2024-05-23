import React, { useState, useEffect } from 'react';
import axios from 'axios';

const imageStyle = {
  border: '1px solid #ccc',
  alignItems: 'flex-start',
  padding: '1vh',
  marginBottom: '1vh',
  width: '100%',
  height: 200,
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
}

const CarPhotoAPI = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.unsplash.com/photos/random/', {
          headers: {
            Authorization: 'Client-ID n_tf9FBumTAVXh-3oZpzf4IvSWzB0AA3rgWqKSHNp9Y'
          },
          params: {
            query: 'car',
            count: 18
          }
        });
        setImages(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error',err);
        setError('Failed to fetch image');
        setLoading(false);
      }
    };

    fetchRandomImage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        {images.map((image) => (
            <img src={`${image.urls.raw}&w=80&fit=crop`}
            style={imageStyle}/>
        ))}
    </div>
  );
};

export default CarPhotoAPI;