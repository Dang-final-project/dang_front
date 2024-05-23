import React, { useRef, useContext, useState } from 'react';
import { MapContext } from '../../../../contexts/MapContext';
import Detail from '../../../../components/popup/Detail';
import { MapMarker } from 'react-kakao-maps-sdk';
import { MarkerClusterer } from 'react-kakao-maps-sdk';

const ClusterMarker = () => {
  const { positionArr } = useContext(MapContext);
  const [open, setOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState(null);
  const mapRef = useRef();

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    if (map) {
      const level = map.getLevel() - 1;
      map.setLevel(level, { anchor: cluster.getCenter() });
    }
    
  };

  const handleClickOpen = (index) => {
    setDetailIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };


  return (
    <MarkerClusterer
      averageCenter={true}
      minLevel={6}
      disableClickZoom={false}
      onClick={() => onClusterclick()}
    >
      {positionArr?.map((position, index) => (
        <MapMarker
          key={`${position.title}-${index}`}
          position={position.latlng}
          onClick={() => handleClickOpen(index)}
        />
      ))}
      <Detail open={open} handleClose={handleClose} detailIndex={detailIndex} />
  </MarkerClusterer>
  );
};

export default ClusterMarker;
