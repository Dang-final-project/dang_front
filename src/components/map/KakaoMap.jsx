import React, { useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

const KakaoMap = () => {
    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
    });

    const center = { lat: 33.5563, lng: 126.79581 };

    const [position, setPosition] = useState(center);

    return (
        <Map
            position="absolute"
            center={center} // 지도의 중심 좌표
            style={{ width: "100%", height: "100vh" }} // 지도 크기
            level={3} // 지도 확대 레벨
        >
            <MapMarker position={position}>
                <div style={{ color: "#000" }}>Hello World!</div>
            </MapMarker>
        </Map>
    );
};

export default KakaoMap;
