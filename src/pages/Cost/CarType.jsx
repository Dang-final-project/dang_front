import React, { useState } from 'react';
import { Grid, Box, Button, Typography, Modal} from '@mui/material';
import CarAPI from './CarAPI';
import CarPhotoAPI from './CarPhotoAPI';
import SearchInput from './../../components/input/SearchInput';

// 박스 누르면 팝업창 뜨는거
// 팝업창 위에 자세한 정보 나오게
// 버튼 누르면 검색 가능하게 구현
const CarType = () => {

    const [open, setOpen] = useState(false);
    const [popupContent, setPopupContent] = useState('');

    const handleOpen = (content) => {
        setPopupContent(content);
        setOpen(true);
  };

  const handleClose = () => setOpen(false);

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
                justifyContent: 'center',
                alignContent: 'center',
                border: '1px solid #ccc',
                padding: '2vh',
                margin: '2vh',
                width: '80%',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }} onClick={() => handleOpen('Car Photo and Details')}>
                
                <Box sx ={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: '40%',
                    height: '100%',
                    marginRight: '2vh',
                    cursor: 'pointer'
                }} >
                    <CarPhotoAPI />
                </Box>
                
                <Box sx={{
                    alignItems: 'flex-start',
                    width: '60%',
                    cursor: 'pointer',
                }}>
                    <CarAPI />
                </Box>
            </Box>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          onClick={handleClose} 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Popup Content
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {popupContent}
          </Typography>
        </Box>
      </Modal>
    </Grid>
    );
}

export default CarType;