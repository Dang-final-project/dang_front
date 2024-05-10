import FilterList from "../components/map/FilterList";
import SearchBox from "../components/map/SearchBox";
import LocateList from "../components/map/LocateList";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect } from "react";
import { Box, Paper, ButtonGroup, Button } from "@mui/material";
import BottomBtns from "../components/map/BottomBtns";
import KakaoMap from "../components/map/KakaoMap";
import { Map } from "react-kakao-maps-sdk";

const Home = () => {
    //반응형분기점
    const theme = useTheme();
    const tabletWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            {tabletWidth ? (
                <>
                    <Box sx={{ marginTop: "64px" }}>
                        <FilterList sx={{ position: "relative" }} />
                        <KakaoMap sx={{ zIndex: "-100", position: "absolute", top: 0 }}></KakaoMap>
                        <Box
                            sx={{
                                width: "40%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                                p: 3,
                                position: "absolute",
                                top: "130px",
                                zIndex: 10,
                            }}
                        >
                            <SearchBox />
                            <LocateList />
                        </Box>
                    </Box>
                </>
            ) : (
                <Box sx={{ position: "relative", marginTop: "64px" }}>
                    <KakaoMap sx={{ position: "absolute", top: 0 }} />
                    <Box sx={{ zIndex: "10", position: "absolute", bottom: 10 }}>
                        <BottomBtns />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Home;
