import * as React from 'react';
import { Grid, Box, Button, Typography} from '@mui/material';
import CarAPI from './CarAPI';
import CarPhotoAPI from './CarPhotoAPI';
import SearchInput from './../../components/input/SearchInput';





// 박스 누르면 팝업창 뜨는거
// 팝업창 위에 자세한 정보 나오게
const CarType = () => {

    return ( 
        <Grid sx={{display: "flex", flexDirection: "column", alignItems: "center", width: '70%', marginTop:'1vh'}}>
        <Box 
            sx={{ 
                backgroundColor: '#f1f1f1', 
                width: '100%', 
                border: '1px solid black',
                boxShadow: '0px 5px 5px rgba(58, 56, 56, 0.5)',
                padding: '2vh',
                marginBottom: '2vh',
                borderRadius: '8px'
                }}>
            <Typography>제조사별</Typography>
            <Button variant="outlined" sx={{marginRight: '1vh'}}>현대</Button>
            <Button variant="outlined">기아</Button>
            <Typography sx={{marginTop: '1vh'}}>승차인원</Typography>
            <Button variant="outlined" sx={{marginRight: '1vh'}}>4인승</Button>
            <Button variant="outlined">5인승</Button>
            <Typography sx={{marginTop: '1vh'}}>충전방식</Typography>
            <Button variant="outlined" sx={{marginRight: '1vh'}}>DC차데모<br/>(급속)</Button>
            <Button variant="outlined">B타입5핀<br/>(완속)</Button>
            <Typography sx={{marginTop: '1vh'}}>차량검색</Typography>
            <SearchInput/>
        </Box>
        <Box
            sx={{
                display: 'flex',
                border: '1px solid #ccc',
                padding: '2vh',
                margin: '2vh',
                width: '80%',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}>
                <Box sx ={{
                    width: '40%',
                    height: '5vh',
                    marginRight: '2vh'
                }}>
                    <CarPhotoAPI />
                </Box>
                <Box sx={{
                    width: '60%'
                }}><CarAPI />
                </Box>
        </Box>
    </Grid>
    );
}

export default CarType;