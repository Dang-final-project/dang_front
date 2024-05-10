import { Box, Stack, Chip, Typography, Button, IconButton } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Station = () => {
    return ( 
        <Box sx={{borderBottom:'1px solid #bdbdbd', py:2}}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Chip label="브랜드명" color="primary" variant="outlined" />
                <IconButton aria-label="like">
                    <StarBorderIcon fontSize="large"/>
                </IconButton>
            </Box>
            <Typography variant="h5" gutterBottom>당신 근처의 주유소</Typography>
            <Stack direction="row" spacing={2}>
                <Typography gutterBottom sx={{width:'70px'}}>충전타입</Typography>
                <Typography gutterBottom>완속</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography gutterBottom sx={{width:'70px'}}>가격</Typography>
                <Typography gutterBottom>880원</Typography>
            </Stack>
            <Box sx={{bgcolor:'grey.100',p:2, mt:2, display:'flex', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Typography>충전원할<span>0</span>/<span>2</span></Typography>
                <Button variant="contained" color="secondary">예약하기</Button>
            </Box>
        </Box>
     );
}
 
export default Station;