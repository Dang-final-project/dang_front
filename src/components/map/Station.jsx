import { Box, Stack, Chip, Typography, Button, IconButton } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

const Station = ({station, favList, getFav, avail_memo}) => {

    const [clicked, setClicked] = useState(false);

    const { postId } = useParams();

    console.log(postId);
    
    useEffect(() => {
        favList.forEach(f => {
            station.chrstn_id === f.chrstn_id && setClicked(true);
        })
    }, []);
    
    const addStation = async()=>{
        if(clicked === false) {
            try{
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/stations/add`,{
                    chrstn_id : station.chrstn_id,
                    //유저아이디 등록
                    id : 2
                })
                if (res.data.code === 200){
                    setClicked(true);
                    getFav();
                }
            }catch(err){
                console.error(err);
            }
        }
    }

    const deleteStation = async()=>{
        if(clicked === true){
            try{
                const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/stations/remove`,{
                    data:{
                        chrstn_id : station.chrstn_id,
                        //유저아이디 등록
                        id : 2
                    }
                })
                if (res.data.code === 200){
                    console.log(res);
                    setClicked(false)
                    getFav();

                }

            }catch(err){
                console.error(err);
            }
        }
    }

    return ( 
        <Box sx={{borderBottom:'1px solid #bdbdbd', py:2}}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Box>
                    <Chip label="브랜드명" color="primary" variant="outlined" />
                    {
                        avail_memo &&
                        <IconButton aria-label="memo">
                            <ModeEditOutlineIcon fontSize="large" />
                        </IconButton>
                    }
                </Box>
                {clicked ?
                    <IconButton aria-label="like" onClick={deleteStation}>
                        <StarIcon color="secondary" fontSize="large"/>
                    </IconButton>
                    :
                    <IconButton aria-label="unlike" onClick={addStation}>
                        <StarBorderIcon fontSize="large"/>
                    </IconButton>
                }
            </Box>
            <Typography variant="h5" gutterBottom>{station.chrstnNm}</Typography>
            <Stack direction="row" spacing={2}>
                <Typography gutterBottom sx={{width:'80px'}}>충전타입</Typography>
                <Typography gutterBottom>{station.chrstnType}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography gutterBottom sx={{width:'80px'}}>이용시간</Typography>
                <Typography gutterBottom>{station.useOpenTime}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography gutterBottom sx={{width:'80px'}}>상세주소</Typography>
                <Typography gutterBottom>{station.rdnmadr}</Typography>
            </Stack>
            <Box sx={{bgcolor:'grey.100',p:2, mt:2, display:'flex', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Typography>충전원할<span>{station.avail_count}</span>/<span>{station.tot_count}</span></Typography>
                <Button variant="contained" color="secondary">예약하기</Button>
            </Box>
        </Box>
     );
}
 
export default Station;