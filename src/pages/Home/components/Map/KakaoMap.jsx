import React, { useContext, useEffect, useState, useRef } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { MapContext } from '../../../../contexts/MapContext'; // 경로 수정
import Geolocate from './Geolocate';
import ClusterMarker from './ClusterMarker';

const KakaoMap = () => {
  const { positionArr, stations, mapPos, setMapPos } = useContext(MapContext);
  
  //console.log(stations);

  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
    libraries: ["clusterer"],
  });

  const mapRef = useRef(); // map 참조 생성
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [position, setPosition] = useState(center);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
        setCenter({lat:pos.coords.latitude, lng:pos.coords.longitude});
    })
    navigator.geolocation.watchPosition(pos => {
        setPosition({lat:pos.coords.latitude, lng:pos.coords.longitude});
    });
}, []);

const onCenterChanged = (map) => {
  setCenter({
    lat: map.getCenter().getLat(),
    lng: map.getCenter().getLng(),
  });
};
    
  useEffect(() => {
      setCenter(mapPos);
  }, [mapPos]);


  return (
    <>
    <Map
      id="map"
      position="absolute"
      center={center}
      style={{ width: "100%", height: "calc(100vh - 64px - 58.5px)" }}
      level={3}
      ref={mapRef}
      onCenterChanged={onCenterChanged}
    >
      <Geolocate center={center} position={position} setCenter={setCenter} setPosition={setPosition} mapRef={mapRef}
        sx={{marginbottom: "100%"}}
      />
      <ClusterMarker />
    </Map>
      

    </>
  );
};

export default KakaoMap;