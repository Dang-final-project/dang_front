import React, { useState } from "react";
import { Map, MapMarker, useKakaoLoader, ZoomControl } from "react-kakao-maps-sdk";
import Detail from "../popup/Detail";

const KakaoMap = () => {
    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
    });
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState("");

    const handleClickOpen = () => {
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
                center={{ lat: 33.5563, lng: 126.79581 }}
                style={{ width: "100%", height: "calc(100vh - 64px - 52.5px)" }}
                level={3}
                onZoomChanged={(map) => {
                    const level = map.getLevel();
                    setResult(`현재 지도 레벨은 ${level} 입니다`);
                }}
            >
                <ZoomControl />
                <MapMarker position={{ lat: 33.5563, lng: 126.79581 }} onClick={handleClickOpen}/>
            </Map>
            <Detail open={open} handleClose={handleClose} />
        </>
    );
};

export default KakaoMap;
