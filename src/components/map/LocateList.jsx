import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from 'react';
import Station from "./Station";
import axios from "axios";


const LocateList = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [stations, setStations] = useState([]);

    const getStations = async() => {
        try{
            const key = process.env.REACT_APP_STATION_API_KEY;
            const pageIdx = 0;
            const count = 10;
            //검색기능 구현할 때 사용
            const searchKey = null;
            const searchValue = null;
            const url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&numOfRows=${count}&pageNo=${pageIdx}`
            const response = await axios.get(url);
            if(response.status === 200){
                setStations(response.data.items)
            }

        }catch(err){
            console.error(err);
        }
    }

    console.log(stations);

    useEffect(()=>{
        getStations();
    },[])

    return ( 
        <Paper sx={{p:2, maxWidth:'460px', flexGrow:1, overflow:'hidden'}}>
            <Typography>주변 충전소 : <span>255</span>개</Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="충전소리스트">
                    <Tab label="충전소 리스트" value="1" sx={{width:'50%'}} />
                    <Tab label="MY충전소" value="2" sx={{width:'50%'}} />
                </TabList>
                </Box>
                <TabPanel value="1" sx={{height:'100%', overflow:'scroll'}}>
                    {
                        stations.map((station,idx) => {
                            return (
                                <Station key={idx} station={station}/>
                            )
                        })
                    }
                </TabPanel>
                <TabPanel value="2" sx={{height:'100%', overflow:'scroll'}}>Item Two</TabPanel>
            </TabContext>
        </Paper>
     );
}
 
export default LocateList;