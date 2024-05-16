import { Box, Paper, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useState } from "react";
import Station from "./Station";
import axios from "axios";
import SearchBox from "./SearchBox";
import KakaoMap from "./KakaoMap";

const LocateList = () => {
    const [value, setValue] = React.useState("1");
    const [favList, setFavList] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [stations, setStations] = useState([]);
    const [favStation, setFavStation] = useState([]);
    const [positionArr, setPositionArr] = useState();
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

    const getStations = async () => {
        try {
            const key = process.env.REACT_APP_STATION_API_KEY;
            const pageIdx = 0;
            const count = 10;
            const url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&numOfRows=${count}&pageNo=${pageIdx}`;
            const response = await axios.get(url);
            if (response.status === 200) {
                const results = [];
                response.data.items.forEach((item) => {
                    const cur_lat = item.latitude;
                    const cur_lng = item.longtitude;
                    const ex_item = results.find((r) => r.latitude === cur_lat && r.longtitude === cur_lng);
                    if (!ex_item) {
                        //충전소 상태 체크(2는 사용중)
                        if (item.charger_status === "2") {
                            item.avail_count = 1;
                        } else {
                            item.avail_count = 0;
                        }
                        item.tot_count = 1;
                        results.push(item);
                    } else {
                        if (item.charger_status === "2") {
                            ex_item.avail_count += 1;
                        }
                        ex_item.tot_count += 1;
                    }
                });
                //console.log(results);
                const arr = []
                results.forEach(r => {
                    console.log(r)
                    const p = {title: r.chrstnNm, latlng: {lat: r.latitude, lng: r.longitude}}
                    arr.push(p)
                });
                setPositionArr(arr);
                setStations(results);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 로그인 구현되면 api호출방식 get으로 변경해야함
    const getFav = async () => {
        const urll = `${process.env.REACT_APP_SERVER_URL}/stations/list`;
        const fav = await axios.post(urll, { id: 2 });
        //console.log(fav.data.payload);
        setFavList(fav.data.payload);
    };

    const getFavStations = async() => {
        const key = process.env.REACT_APP_STATION_API_KEY;
        const pageIdx = 0;
        const count = 10;
        const searchKey = 'chrstn_id';
        const searchValue = favList.map(obj => obj.chrstn_id).join(';');
       if(searchValue !== ''){
            try{
                const url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&sortKey=chrstnType&filterKey=${searchKey}&filterValues=${searchValue}&numOfRows=${count}&pageNo=${pageIdx}`
                const response = await axios.get(url);
                if(response.status === 200){
                    const results= [];
                    response.data.items.forEach(item => {
                        const cur_lat = item.latitude;
                        const cur_lng = item.longtitude;
                        const ex_item = results.find((r) => r.latitude === cur_lat && r.longtitude === cur_lng);
                        if (!ex_item) {
                            if (item.charger_status === "2") {
                                item.avail_count = 1;
                            } else {
                                item.avail_count = 0;
                            }
                            item.tot_count = 1;
                            results.push(item);
                        } else {
                            if (item.charger_status === "2") {
                                ex_item.avail_count += 1;
                            }
                            ex_item.tot_count += 1;
                        }
                    });
                    //console.log(results)
                    setFavStation(results);
                }
            }catch(err){
                console.error(err);
            }
        }
    };

    const searchFilter = async() => {
        const key = process.env.REACT_APP_STATION_API_KEY;
    }

    useEffect(() => {
        getStations();
        getFav();
    }, []);

    useEffect(() => {
        getFavStations();
    }, [favList]);

    return (
        <>
        {
            positionArr &&
            <KakaoMap sx={{ zIndex: "-100", position: "absolute", top: 0 }} positionArr={positionArr}></KakaoMap>
        }
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
                                        avail_memo={false}
                                    />
                                );
                            })
                        ) : (
                            <Typography>데이터 로딩중</Typography>
                        )}
                    </TabPanel>
                    <TabPanel value="2" sx={{ height: "100%", overflow: "scroll" }}>
                        {favStation && favList.length !== 0 ? (
                            favStation.map((fav, idx) => {
                                return (
                                    <Station
                                        key={idx}
                                        station={fav}
                                        favList={favList}
                                        getFav={getFav}
                                        avail_memo={true}
                                    />
                                );
                            })
                        ) : (
                            <Typography>즐겨찾기가 존재하지 않습니다.</Typography>
                        )}
                    </TabPanel>
                </TabContext>
            </Paper>
        </Box>
        </>
    );
};
export default LocateList;
