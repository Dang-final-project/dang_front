import React from "react";
import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

const MapMarkers = ({ positionArr, handleClickOpen, map }) => {
    const onClusterclick = (_target, cluster) => {
        //const map = mapRef.current;
        if (map) {
            const level = map.getLevel() - 1;
            map.setLevel(level, { anchor: cluster.getCenter() });
        }
    };

    return (
        <MarkerClusterer
            averageCenter={true}
            minLevel={6}
            disableClickZoom={true}
            onClusterclick={onClusterclick}
        >
            {positionArr.map((position, index) => (
                <MapMarker
                    key={`${position.title}-${index}`}
                    position={position.latlng}
                    onClick={() => handleClickOpen(index)}
                />
            ))}
        </MarkerClusterer>
    );
};

export default MapMarkers;
