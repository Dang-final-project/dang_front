import { Box, Paper, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useContext, useEffect, useState } from "react";
import Station from "./Station";
import axios from "axios";
import SearchBox from "./SearchBox";
import { MapContext } from "../../contexts/MapContext";

const LocateList = () => {

    const {
        stations, 
        setStations, 
        favStation, 
        setFavStation, 
        favList,
        setFavList,
        setPositionArr,
        filterList
    } = useContext(MapContext)

    const token = localStorage.getItem('token');

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

    // // 로그인 구현되면 api호출방식 get으로 변경해야함
    const getFav = async () => {
        const urll = `${process.env.REACT_APP_SERVER_URL}/stations/list`;
        const fav = await axios.get(urll, { 
            headers : {
                'authorization' : `${token}`
            }
         });
        //console.log(fav.data.payload);
        if(fav.data.payload) {
            setFavList(fav.data.payload);
        }
    };

    useEffect(()=>{
        getFav();
    },[])

    console.log(favList);

    return (
        <>
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
                height: "calc(100vh - 64px - 52.5px)",
            }}
        >
            <SearchBox onClick={handleSearch} handleSearchChange={handleSearchChange} />
            <Paper sx={{ p: 2, maxWidth: "460px", flexGrow: 1, overflow: "hidden" }}>
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
                                                favList={favList}
                                                getFav={getFav}
                                            />
                                        );
                                    })
                                ) : (
                                    <Typography>데이터 로딩중</Typography>
                                )}
                            </TabPanel>
                            <TabPanel value="2" sx={{ height: "100%", overflow: "scroll" }}>
                                {favStation && favList && favList.length > 0 ? (
                                    favStation.map((fav, idx) => {
                                        return (
                                            <Station
                                                key={idx}
                                                station={fav}
                                                favList={favList}
                                                getFav={getFav}
                                            />
                                        );
                                    })
                                ) : (
                                    <Typography>즐겨찾기가 존재하지 않습니다.</Typography>
                                )}
                            </TabPanel>
                        </TabContext>
                    </>
                    :
                    <p>리스트 가져오는 중..</p>
                }
            </Paper>
        </Box>
        </>
    );
};
export default LocateList;
