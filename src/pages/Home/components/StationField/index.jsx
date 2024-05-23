import { Box, Paper, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useContext, useState } from "react";
import Station from "./Station";
import { MapContext } from "../../../../contexts/MapContext";
import SearchBox from "./SearchBox";
import axios from "axios";

export const StationField = () => {

    const token = localStorage.getItem('token');
    const { stations, setStations, favStation, favList } = useContext(MapContext)

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
        const key = process.env.REACT_APP_STATION_API_KEY;
        const pageIdx = 0;
        const count = 10;
        const url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&numOfRows=${count}&pageNo=${pageIdx}`;
        try {
            const response = await axios.get(url);
            const datas = response.data.items;
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
        display: "flex",
        justifyContent:"space-between",
        p: 2,
        position: "absolute",
        zIndex: 10,
        height: "calc(100vh - 64px - 58.5px)"
    }

    return (
        <Box sx={containerStyle}>
            <Paper sx={{ p: 2, width: "40%", maxWidth: "460px", flexGrow: 1, overflow: "hidden" }}>
                {
                    stations ?
                    <>
                        <Typography>
                            주변 충전소 : <span>{stations.length}</span>개
                        </Typography>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="충전소리스트">
                                    <Tab label="충전소 리스트" value="1" sx={{ width: "50%" }} />
                                    <Tab label="MY충전소" value="2" sx={{ width: "50%" }} />
                                </TabList>
                            </Box>
                            <TabPanel value="1" sx={{ height: "100%", overflow: "scroll" }}>
                                {stations ? (
                                    stations.map((station, idx) => {
                                        return (
                                            <Station
                                                key={idx}
                                                station={station}
                                                tab={'all'}
                                            />
                                        );
                                    })
                                ) : (
                                    <Typography>데이터 로딩중</Typography>
                                )}
                            </TabPanel>
                            <TabPanel value="2" sx={{ height: "100%", overflow: "scroll" }}>
                                {
                                    token ?
                                        (favStation && favStation.length !== 0 && favList.length !== 0  ? (
                                            favStation.map((fav, idx) => {
                                                return (
                                                    <Station
                                                        key={idx}
                                                        station={fav}
                                                        tab={'fav'}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <Typography>즐겨찾기가 존재하지 않습니다.</Typography>
                                        ))
                                    :
                                    <Typography>로그인 후 이용해주세요.</Typography>
                                }
                            </TabPanel>
                        </TabContext>
                    </>
                    :
                    <p>리스트 가져오는 중..</p>
                }
            </Paper>
            <SearchBox onClick={handleSearch} handleSearchChange={handleSearchChange} />
        </Box>
    );
};
