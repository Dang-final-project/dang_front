import { Box, Stack, Typography, Button, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../../../contexts/MapContext";
import MemoButton from "./MemoButton";
import LikeButton from "./LikeButton";
import axios from "axios";
import ReserveBox from "./ReserveBox";
import { stationApi } from "../../../../api/services/station";

const Station = ({station, tab, token }) => {
    const {setMapPos} = useContext(MapContext);

    const [clicked, setClicked] = useState(false);
    const { favList, setFavList } = useContext(MapContext);

    //즐겨찾기 데이터 갱신
    const getFav = async () => {
        // const urll = `${process.env.REACT_APP_SERVER_URL}/stations/list`;
        // const fav = await axios.get(urll, { 
        //     headers : {
        //         'authorization' : `${token}`
        //     }
        //     });
        const fav = await stationApi.getFav(token);
        setFavList(fav.data.payload);    
    };


   const changeStationLocation = () => {
    setMapPos({lat: station.latitude, lng: station.longitude})
   }

    return ( 
        <Paper elevation={4} sx={{p:2, mb: 2}} onClick={changeStationLocation}>
            { token && 
                <MemoButton token={token} station={station} getFav={getFav} clicked={clicked}/> 
            }
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Typography variant="h5">{station.chrstnNm}</Typography>
                { token && 
                    <LikeButton token={token} station={station} getFav={getFav} tab={tab} clicked={clicked} setClicked={setClicked} /> 
                }
            </Box>
            <Stack direction="row" >
                <Typography gutterBottom sx={{width:'100px'}}>운영기관</Typography>
                <Typography gutterBottom >{station.manage_entrps_nm}</Typography>
            </Stack>
            <Stack direction="row" >
                <Typography gutterBottom sx={{width:'100px'}}>충전타입</Typography>
                <Typography gutterBottom >{station.chrstnType}</Typography>
            </Stack>
            {token && 
                <ReserveBox chrstnNm={station.chrstnNm} avail_count={station.avail_count} tot_count={station.tot_count} />
            }
        </Paper>
     );
}

export default Station;