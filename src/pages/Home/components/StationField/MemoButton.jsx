import { useState, useEffect, useContext } from "react";
import axios from "axios";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import { MapContext } from "../../../../contexts/MapContext";

const MemoButton = ({ token, station, clicked }) => {

    const { favList } = useContext(MapContext);
    const [write, setWrite] = useState(false);
    const [complete, setComplete] = useState(false);
    const [text, setText] = useState('');

    const handleMemoBtnClick = () => {
        setWrite(true);
        setComplete(false);
    };

    const handleTextEdit = () => {
        setWrite(true);
        setComplete(false);
    };

    const postMemo = async()=>{
        try{
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/stations/memo`,
                {
                    chrstn_id : station.chrstn_id,
                    memo:text
                },
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                }
            )
            .then(() => {
                if (text === '' && text !== null) {
                    setWrite(false);
                    setComplete(false);
                }else {
                    setWrite(false);
                    setComplete(true);
                }
            });

        }catch(err){
            console.error(err);
        }
    }

    const getMeMmo = () => {
        if(favList){
            favList.forEach(f => {
                if(f.chrstn_id === station.chrstn_id){
                    if(f.memo !== null && f.memo !== ''){
                        setComplete(true);
                        setText(f.memo);
                    }
                }
            })
        }
   }

    useEffect(() => {
        getMeMmo();
    }, [favList]);

   useEffect(()=>{getMeMmo()},[favList]);

    return ( 
        <>
        {clicked ?
            <>
                {!complete && !write && (
                    <Button 
                        aria-label="memo" 
                        size="small" 
                        sx={{color:'primary.main',bgcolor:'#E9EFFF'}}
                        onClick={handleMemoBtnClick}
                    >
                        <Typography sx={{fontSize:"14px",marginRight:"2px"}}>메모추가</Typography>
                        <RateReviewIcon fontSize="small"/>
                    </Button>  
                )}
                {!complete && write && (
                    <Box>
                        <TextField 
                            size="small"
                            onChange={(e)=>{
                                e.preventDefault();
                                setText(e.target.value);
                            }}
                            value={text}
                        />
                        <Button onClick={()=>{postMemo()}}>완료</Button>
                    </Box> 
                )}
                {complete && !write && (
                    <Box sx={{display:'flex',gap:'4px',alignItems:"center"}}>
                        <Typography color="primary" sx={{fontWeight:'bold'}}>{text}</Typography>
                        <IconButton color="primary" onClick={handleTextEdit}>
                            <RateReviewIcon color="primary" fontSize="small"/>
                        </IconButton>
                    </Box>
                )}
            </>
        : null}
        </>
    );
}
 
export default MemoButton;

 
