import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MapContext } from "../../../contexts/MapContext";
import SearchInput from "../../../components/input/SearchInput";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Box, Button } from "@mui/material";


const Review = ({ detailIndex }) => {
    //충전소 제목 받아오는 거
    // const { stations } = useContext(MapContext);
    // const stationInfo = stations.length > 0 ? stations[detailIndex] : null;
    
    const navigate = useNavigate();

    const handleWriteButtonClick = () => {
        navigate("/community/posting");
    };

    return ( 
        <>
            <SearchInput width='100%' />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem sx={{flexDirection: "column"}}>
                    <Box sx={{display: "flex", alignContent: "center", justifyContent: "space-between", width: '100%'}}>
                        <Typography variant="body1">00충전소</Typography>
                        <Typography variant="body1">
                            작성자: 0000
                        </Typography>
                        <Typography variant="body1">
                            작성일: 00-00-00
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection:"column", alignContent: "center", justifyContent: "flex-start", width: '100%'}}>
                        <Typography variant="body1" component="span">
                            {"⭐⭐⭐⭐⭐"}
                            {/* {"⭐".repeat(Math.floor(p.rating))} ({p.rating.toFixed(2)}) */}
                        </Typography>
                        <Typography component="span" variant="subtitle1">
                            CONTENTS
                        </Typography>
                    </Box>
                </ListItem>
            </List>
            <Button variant="text" onClick={handleWriteButtonClick}>작성하기</Button>
        </>
    );
}
 
export default Review;
