import { Box, Paper, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useContext, useEffect, useState } from "react";
import Station from "./Station";
import { MapContext } from "../../../../contexts/MapContext";
import SearchBox from "./SearchBox";
import axios from "axios";
import { externalApi } from "../../../../api/services/external";

export const StationField = () => {
    const { stations, setStations, favStation, favList } = useContext(MapContext);
    const [count, setCount] = useState(0);

    const token = localStorage.getItem("token");

    //탭 이벤트
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [searchWord, setSearchWord] = useState("");

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value);
    };

    const handleSearch = async () => {
        // const key = process.env.REACT_APP_STATION_API_KEY;
        // console.log(key);
        const pageIdx = 0;
        const count = 1580;
        // const url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&numOfRows=${count}&pageNo=${pageIdx}`;
        try {
            
            const response = await externalApi.getAllStation(count, pageIdx);
            const datas = response.data.items;
            console.log(datas);
            if (response.status === 200) {
                const filteredStations = datas.filter((station) => station.chrstnNm.includes(searchWord.toUpperCase()));
                setStations(filteredStations);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const containerStyle = {
        width: "100%",
        maxWidth: "460px",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    };

    useEffect(() => {
        setCount(stations.length);
    }, []);

    return (
        <Paper sx={containerStyle} square>
            <Box>
                <SearchBox onClick={handleSearch} handleSearchChange={handleSearchChange} />
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: "hidden", height: "calc(100% - 90px)", pb: 2 }}>
                {stations ? (
                    <>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="충전소리스트">
                                    <Tab label="주변 충전소" value="1" sx={{ width: "50%" }} />
                                    <Tab label="자주 가는 충전소" value="2" sx={{ width: "50%" }} />
                                </TabList>
                            </Box>
                            <TabPanel
                                value="1"
                                sx={{ height: "calc(100% - 40px)", overflowY: "scroll", bgcolor: "grey.100" }}
                            >
                                {stations ? (
                                    stations.map((station, idx) => {
                                        return <Station key={idx} station={station} tab={"all"} token={token} />;
                                    })
                                ) : (
                                    <Typography>데이터 로딩중</Typography>
                                )}
                            </TabPanel>
                            <TabPanel
                                value="2"
                                sx={{ height: "calc(100% - 40px)", overflowY: "scroll", bgcolor: "grey.100" }}
                            >
                                {token ? (
                                    favStation && favStation.length !== 0 && favList.length !== 0 ? (
                                        favStation.map((fav, idx) => {
                                            return <Station key={idx} station={fav} tab={"fav"} token={token} />;
                                        })
                                    ) : (
                                        <Typography>즐겨찾기가 존재하지 않습니다.</Typography>
                                    )
                                ) : (
                                    <Typography>로그인 후 이용해주세요.</Typography>
                                )}
                            </TabPanel>
                        </TabContext>
                    </>
                ) : (
                    <p>리스트 가져오는 중..</p>
                )}
            </Box>
        </Paper>
    );
};
