import { Button, Box } from '@mui/material';
import BasicPopup from '../components/popup/BasicPopup'

const Home = () => {

    return ( 
        <>
            <h1>지도홈</h1>
            <BasicPopup />
            <Button variant="contained" color='primary'>버튼</Button>
            <Button variant="contained" color='secondary'>버튼</Button>
            <Box sx={{width:'50px', height:'50px', backgroundColor:'grey.500'}}></Box>
            <Box sx={{width:'50px', height:'50px', backgroundColor:'primary.main'}}></Box>
        </>
     );
}
 
export default Home;