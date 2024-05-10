import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useState } from 'react';


const LocateList = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return ( 
        <Paper sx={{p:2, maxWidth:'460px'}}>
            <Typography>주변 충전소 : <span>255</span>개</Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="충전소리스트">
                    <Tab label="충전소 리스트" value="1" sx={{width:'50%'}} />
                    <Tab label="MY충전소" value="2" sx={{width:'50%'}} />
                </TabList>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
        </Paper>
     );
}
 
export default LocateList;