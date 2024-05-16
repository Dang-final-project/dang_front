import FilterList from "../components/map/FilterList";
import SearchBox from "../components/map/SearchBox";
import LocateList from "../components/map/LocateList";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { Box, Paper, ButtonGroup, Button } from "@mui/material";
import BottomBtns from "../components/map/BottomBtns";
import KakaoMap from "../components/map/KakaoMap";
import { Map } from "react-kakao-maps-sdk";
import { useContext } from "react";
import { MapContext } from "../contexts/MapContext";
import axios from "axios";

const Home = () => {

    const {
        stations, 
        setStations, 
        favStation, 
        setFavStation, 
        favList,
        setFavList,
        positionArr,
        setPositionArr,
        filterList
    } = useContext(MapContext)

    const handleFilter = (obj) => {
        return Object.entries(obj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    }

    const filterQuery = handleFilter(filterList);
    console.log(filterQuery);

    const getStations = async () => {
        try {
            const key = process.env.REACT_APP_STATION_API_KEY;
            if (!key) {
                throw new Error("API key 없음");
            }
            const pageIdx = 0;
            const count = 10;
            let url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&numOfRows=${count}&pageNo=${pageIdx}`;
            //필터검색
            if(filterQuery !== '') {
                url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&sortKey=chrstnType&${filterQuery}&numOfRows=${count}&pageNo=${pageIdx}`;
                console.log(url);
            }
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

    useEffect(() => {
        getStations();
    }, []);

    useEffect(() => {
        getFavStations();
    }, [favList]);

    //반응형분기점
    const theme = useTheme();
    const tabletWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            {
                positionArr ?
                <>
                    <KakaoMap sx={{ zIndex: "-100", position: "absolute", top: 0 }} positionArr={positionArr}></KakaoMap>
                    {tabletWidth ? (
                        <>
                            <Box sx={{ marginTop: "64px" }}>
                                <FilterList sx={{ position: "relative" }} />
                                {/* <SearchBox /> */}
                                <LocateList />
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ position: "relative", marginTop: "64px" }}>
                            <Box sx={{ zIndex: "10", position: "absolute", bottom: 10 }}>
                                <BottomBtns />
                            </Box>
                        </Box>
                    )}
                </>
                :
                <p>지도 로딩중...</p>
            }
        </>
    );
};

export default Home;
