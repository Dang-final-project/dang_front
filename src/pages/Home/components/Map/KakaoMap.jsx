import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { MapContext } from '../../../../contexts/MapContext'; // 경로 수정
import Geolocate from './Geolocate';
import ClusterMarker from './ClusterMarker';
import { FilterGroup } from '../FilterGroup';
import { Box } from '@mui/material';

const KakaoMap = () => {
  const { positionArr, stations, mapPos, setMapPos } = useContext(MapContext);
  //console.log(stations);

  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
    libraries: ["clusterer"],
  });

  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [position, setPosition] = useState(center);

  //반응형분기점
  const theme = useTheme();
  const tabletWidth = useMediaQuery(theme.breakpoints.up("md"));
    
  useEffect(() => {
      setCenter(mapPos);
  }, [mapPos]);


  return (
    <Box component="section" sx={{position:"relative", width: "100%", height: "calc(100vh - 64px)"}}>
      <Map
        id="map"
        position="absolute"
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={3}
      >
        <Geolocate center={center} position={position} setCenter={setCenter} setPosition={setPosition} />
        <ClusterMarker />
      </Map>
      {tabletWidth ? <FilterGroup /> : null}
    </Box>
  );
};

export default KakaoMap;
