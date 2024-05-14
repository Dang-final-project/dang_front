import React, { useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

const KakaoMap = () => {
    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
        libraries: ["clusterer"]
    });

    const center = { lat: 33.5563, lng: 126.79581 };

    const [position, setPosition] = useState(center);

    const onClusterclick = (_target, cluster) => {
        const map = mapRef.current;
        const level = map.getLevel() - 1;
        map.setLevel(level, { anchor: cluster.getCenter() });
    };

    useEffect(() => {
        // 마커 클러스터링에 사용할 위치 데이터 설정
        const clusterPositionsData = {
            positions: [
                { title: "카카오", latlng: { lat: 33.450705, lng: 126.570677 } },
                { title: "생태연못", latlng: { lat: 33.450936, lng: 126.569477 } },
                { title: "텃밭", latlng: { lat: 33.450879, lng: 126.56994 } },
                { title: "근린공원", latlng: { lat: 33.451393, lng: 126.570738 } },
                // 추가적인 위치 데이터도 필요하다면 이곳에 추가
            ]
        };
        setPositions(clusterPositionsData.positions);
    }, []);

    return (
        <Map
            position="absolute"
            center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
            style={{ width: "100%", height: "calc(100vh - 64px - 52.5px)" }} // 지도 크기
            level={3} // 지도 확대 레벨
        >
            <MapMarker position={position}>
                <div style={{ color: "#000" }}>Hello World!</div>
            </MapMarker>
        </Map>
    );
};

export default KakaoMap;
