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
            const key = 'KE8fpP1J%2B89PviF5ypn1iC2Pt13cnUqW7zS6rTyC01AY5TnWK7Ke2zgCzNUU8TF3zQyZiEr6YfRfclI79xarRg%3D%3D';
            const pageIdx = 1;
            const count = 10;
            const url = `https://api.odcloud.kr/api/15067156/v1/uddi:4f293dcb-a55b-4f64-b7d1-dab5b0ba56bb?page=${pageIdx}&perPage=${count}&serviceKey=${key}`;
            const response = await axios.get(url);
            if(response.status === 200){
                setStations(response.data.data);
            }

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getStations();
    },[])

    console.log(stations);

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
                    <Station />
                    <Station />
                    <Station />
                    <Station />
                </TabPanel>
                <TabPanel value="2" sx={{height:'100%', overflow:'scroll'}}>Item Two</TabPanel>
            </TabContext>
        </Paper>
     );
}
 
export default LocateList;