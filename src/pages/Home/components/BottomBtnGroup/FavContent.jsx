import { Typography } from "@mui/material";
import Station from "../StationField/Station";
import { MapContext } from "../../../../contexts/MapContext";
import React, { useContext, useEffect, useState } from "react";

const FavContent = () => {

    const { favStation, favList } = useContext(MapContext)

    //로컬,카카오 토큰 가져오기
    const getToken = () => {
        const cookieToken = () => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; accessToken=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null; // 쿠키가 없을 경우 null 반환
        }
    
        const localToken = localStorage.getItem('token');
        const token = cookieToken() || localToken;
    
        return token;
    }

    let token = getToken();

    return ( 
        <>
        {token ? 
            (favStation && favStation.length !== 0 && favList.length !== 0  ? (
                favStation.map((fav, idx) => {
                    return (
                        <Station
                            key={idx}
                            station={fav}
                            tab={'fav'}
                            token={token}
                        />
                    );
                })
            ) : (
                <Typography>즐겨찾기가 존재하지 않습니다.</Typography>
            ))
            : 
            <Typography>로그인 후 이용해주세요.</Typography>
        }
        </>
     );
}
 
export default FavContent;