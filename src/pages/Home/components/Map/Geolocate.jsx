import React, { useRef, useState, useEffect } from 'react';
import { Map as KakaoMapComponent, ZoomControl, MapMarker } from 'react-kakao-maps-sdk';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import IconButton from '@mui/material/IconButton';

const Geolocate = ({ center, setCenter, position, handleClickOpen }) => {
  const mapRef = useRef();

  useEffect(() => {
    // mapRef가 정상적으로 설정되는지 확인
    console.log(mapRef.current);
  }, []);

  
  const comeBackHome = () => {
    setCenter(position);
  };

  // useEffect(() => {
  //   const map = mapRef.current;
  //   if (map) {
  //     map.setCenter(center);
  //   }
  // }, [center]);

  return (
    <>
       <MapMarker position={position} onClick={handleClickOpen} />
        <ZoomControl />
        <IconButton
          color="primary"
          onClick={comeBackHome}
          sx={{ position: 'absolute', top: 200, right: 1, zIndex: 5 }}
        >
          <GpsFixedIcon />
        </IconButton>
    </>
  );
};

export default Geolocate;