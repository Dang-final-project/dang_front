import { Grid, Box, Button, Typography } from '@mui/material';
import SearchInput from './input/SearchInput';


const CarType = () => {

    return ( 
        <Grid sx={{display: "flex", flexDirection: "column", alignItems: "center", width: '70%', marginTop:'1vh'}}>
        <Box 
            sx={{ 
                backgroundColor: '#f1f1f1', 
                width: '100%', 
                border: '1px solid black',
                boxShadow: '0px 5px 5px rgba(58, 56, 56, 0.5)',
                padding: '2vh'
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
                display:'flex',
                marginTop: '4vh',
                width: '75%',
                height: '21vh',
                border: '1px solid black',
                padding: '2vh'
            }}>
                <Box sx={{ width: '35%'
                }}>사진</Box>
                <Box sx={{
                    width: '75%'
                }}>설명</Box>
        </Box>
        </Grid>
    );
}

export default CarType;