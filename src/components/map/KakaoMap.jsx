
import React, { useEffect, useState, useRef } from "react";
import { Map, MapMarker, useKakaoLoader, ZoomControl, MarkerClusterer } from "react-kakao-maps-sdk";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Detail from "../popup/Detail";

const KakaoMap = () => {
    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
        libraries: ["clusterer"]
    });

    const [open, setOpen] = useState(false);
    const mapRef = useRef();
    const [positions, setPositions] = useState([]);
    const [center, setCenter] = useState({
        lat: 33.450701,
        lng: 126.570667,
    });
    const [position, setPosition] = useState(center);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClusterclick = (_target, cluster) => {
        const map = mapRef.current;
        if (map) {
            const level = map.getLevel() - 1;
            map.setLevel(level, { anchor: cluster.getCenter() });
        }
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
        navigator.geolocation.getCurrentPosition(pos => {
            setCenter({lat:pos.coords.latitude, lng:pos.coords.longitude});
        })
        navigator.geolocation.watchPosition(pos => {
            setPosition({lat:pos.coords.latitude, lng:pos.coords.longitude});
        });
    }, []);

    const onCenterChanged = (map) => {
        setCenter({
            lat: map.getCenter().getLat(), lng: map.getCenter().getLng()
        })
    }

    const comeBackHome = () => {
        setCenter(position);
    }
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
                {/* 접속 위치 마커 */}
                <MapMarker position={position} onClick={handleClickOpen} />
                <div display="flex">
                    <ZoomControl  />
                    <IconButton color="primary" onClick={comeBackHome} 
                        sx={{position: "absolute", right: 0, bottom: 350, zIndex: 5 }} 
                    >
                        <GpsFixedIcon />
                    </IconButton>
                </div>
                
                <MarkerClusterer
                    averageCenter={true}
                    minLevel={6}
                    disableClickZoom={true}
                    onClusterclick={onClusterclick}
                >
                    {/* 다중 마커 */}
                    {positions.map((position, index) => (
                        <MapMarker
                            key={`${position.title}-${index}`}
                            position={position.latlng}
                            onClick={handleClickOpen}
                        />
                    ))}
                </MarkerClusterer>
            </Map>
            <Detail open={open} handleClose={handleClose} />
        </>
    );
};

export default KakaoMap;
