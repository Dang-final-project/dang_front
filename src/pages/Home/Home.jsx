import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { MapContext } from "../../contexts/MapContext";
import Loading from "../Loading";
import LocateList from "../Map/LocateList";
import { FilterGroup } from "./components/FilterGroup";
import { BottomBtnGroup } from "./components/BottomBtnGroup";
import { GetStations } from "./utils/GetStations";
import { GetFavStations } from "./utils/GatFavStations";
import { StationField } from "./components/StationField";
import KakaoMap from "../Home/components/Map/KakaoMap";

const Home = () => {
    const { setStations, setFavStation, favList, positionArr, setPositionArr, filterList } = useContext(MapContext);

    useEffect(() => {
        GetStations(filterList, setPositionArr, setStations);
    }, [filterList, setPositionArr, setStations]);

    useEffect(() => {
        GetFavStations(favList, setFavStation);
    }, [favList, setFavStation]);

    //반응형분기점
    const theme = useTheme();
    const tabletWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            {positionArr ? (
                <>
                    {tabletWidth ? (
                        <Box component="section" sx={{ marginTop: "64px" }}>
                            <FilterGroup />
                            {/* <LocateList /> */}
                            <StationField />
                        </Box>
                    ) : (
                        <Box component="section" sx={{ position: "relative", marginTop: "64px" }}>
                            <Box component="article" sx={{ zIndex: "10", position: "absolute", bottom: 10 }}>
                                <BottomBtnGroup />
                            </Box>
                        </Box>
                    )}
                    <KakaoMap
                        sx={{ zIndex: "-100", position: "absolute", top: 0 }}
                        positionArr={positionArr}
                    ></KakaoMap>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;
