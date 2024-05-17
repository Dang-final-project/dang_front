import React, { useEffect, useState, useRef, useContext } from "react";
import { Map, MapMarker, useKakaoLoader, ZoomControl, MarkerClusterer } from "react-kakao-maps-sdk";
import Detail from "../popup/Detail";
import { MapContext } from "../../contexts/MapContext";
import MapMarkers from "./MapMarkers";
import LocationControl from "./LocationControl";

const KakaoMap = () => {
    const { positionArr, mapPos, setMapPos } = useContext(MapContext);

    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
        libraries: ["clusterer"]
    });

    useEffect(() => {
        setCenter(mapPos);
    }, [mapPos]);

    const [open, setOpen] = useState(false);
    const [detailIndex, setDetailIndex] = useState();
    const mapRef = useRef();
    const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
    const [position, setPosition] = useState(center);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
        navigator.geolocation.watchPosition(pos => {
            setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
    }, []);

    const onCenterChanged = (map) => {
        setCenter({
            lat: map.getCenter().getLat(), lng: map.getCenter().getLng()
        })
    }

    const handleClickOpen = (index) => {
        setDetailIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Map
                id="map"
                position="absolute"
                center={center}
                style={{ width: "100%", height: "calc(100vh - 64px - 52.5px)" }}
                level={3}
                ref={mapRef}
                onCenterChanged={onCenterChanged}
            >
                <MapMarker position={position} onClick={handleClickOpen} />
                <ZoomControl />
                <div style={{ position: "absolute", right: 0, bottom: 350, zIndex: 5 }}>
                    <LocationControl position={position} setPosition={setPosition} />
                </div>

                <MapMarkers positionArr={positionArr} handleClickOpen={handleClickOpen} />
            </Map>
            <Detail open={open} handleClose={handleClose} detailIndex={detailIndex} />
        </>
    );
};

export default KakaoMap;
