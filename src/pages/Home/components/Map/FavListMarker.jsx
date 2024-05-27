// src/components/FavListMarker.js
import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

const FavListMarker = ({ position, index, handleClickOpen }) => {
  if (!position.latlng) return null;

  return (
    <MapMarker
      key={`${position.title}-${index}`}
      position={position.latlng}
      onClick={() => handleClickOpen(index)}
      image={{
        src: '/images/즐겨찾기.png',
        size: { width: 55, height: 60 },
        options: { offset: { x: 27, y: 69 } },
      }}
    />
  );
};

export default FavListMarker;
