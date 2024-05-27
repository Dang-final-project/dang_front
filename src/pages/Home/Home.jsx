import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useContext, useState } from "react";
import { Box } from "@mui/material";
import { MapContext } from "../../contexts/MapContext";
import Loading from "../Loading";
import { FilterGroup } from "./components/FilterGroup"; 
import { BottomBtnGroup } from "./components/BottomBtnGroup";
import { GetStations } from "./utils/GetStations";
import { GetFavStations } from "./utils/GatFavStations";
import { StationField } from "./components/StationField";
import KakaoMap from "../Home/components/Map/KakaoMap";

const Home = () => {
    const { favStation, stations, setStations, setFavStation, favList, positionArr, setPositionArr, filterList } = useContext(MapContext);

    // useEffect(()=>{
    //     GetStations(filterList, setPositionArr, setStations);
    //     GetFavStations(favList, setFavStation);
    // },[]);

    useEffect(() => {
        GetStations(filterList, setPositionArr, setStations);
    }, [filterList]);

    useEffect(() => {
        GetFavStations(favList, setFavStation);
    }, [favList]);

    //반응형분기점
    const theme = useTheme();
    const tabletWidth = useMediaQuery(theme.breakpoints.up("md"));


    return (
        <>
            {positionArr ? (
                <Box component="section" sx={{display:"flex"}}>
                    {tabletWidth ? (
                        <>
                            <StationField />
                        </>
                    ) : (
                        <Box component="section" sx={{ position: "relative", marginTop: "64px" }}>
                            <Box component="article" sx={{ zIndex: "10", position: "absolute", bottom: 10 }}>
                                <BottomBtnGroup />
                            </Box>
                        </Box>
                    )}
                    <KakaoMap
                        // sx={{ zIndex: "-100", position: "absolute", top: 0 }}
                        positionArr={positionArr}
                    ></KakaoMap>
                </Box>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;
