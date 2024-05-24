import { useContext, useState } from "react";
import SearchBox from "../StationField/SearchBox";
import { MapContext } from "../../../../contexts/MapContext";
// import { TabPanel } from "@mui/lab";
import Station from "../StationField/Station";
import { Grid, Typography } from "@mui/material";
import axios from "axios";

export const SearchContent = () => {
    const { stations, setStations, favStation, favList } = useContext(MapContext);
    const [searchWord, setSearchWord] = useState("");

    const getToken = () => {
        const cookieToken = () => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; accessToken=`);
            if (parts.length === 2)
                return parts
                    .pop()
                    .split(";")
                    .shift();
            return null; // 쿠키가 없을 경우 null 반환
        };

        const localToken = localStorage.getItem("token");
        const token = cookieToken() || localToken;

        return token;
    };

    let token = getToken();

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

    return (
        <>
            <SearchBox onClick={handleSearch} handleSearchChange={handleSearchChange} />
            <Grid sx={{ width: "480px", height: "500px", marginTop: 3, padding: 3 }}>
                <Grid value="1" sx={{ height: "100%", overflow: "scroll" }}>
                    {stations ? (
                        stations.map((station, idx) => {
                            return <Station key={idx} station={station} tab={"all"} token={token} />;
                        })
                    ) : (
                        <Typography>데이터 로딩중</Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
