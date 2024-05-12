import React from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

const KakaoMap = () => {
    const [loading, error] = useKakaoLoader({
        appkey: "c4ad814c705d06f9c5b70cfb17a8b8cb",
    });
    return (
        <Map
            position="absolute"
            center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
            style={{ width: "100%", height: "calc(100vh - 64px - 52.5px)" }} // 지도 크기
            level={3} // 지도 확대 레벨
        />
    );
};

export default KakaoMap;
