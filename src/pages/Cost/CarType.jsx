import React, { useState } from 'react';
import { Grid, Box, Button, Typography, Modal} from '@mui/material';
import CarAPI from './CarAPI';
import CarPhotoAPI from './CarPhotoAPI';
import SearchInput from './../../components/input/SearchInput';

const gridStyle = {
  display: "flex", flexDirection: "column", alignItems: "center", width: '70%', marginTop:'1vh'
}
const searchBoxStyle = {
  backgroundColor: '#f1f1f1', 
  width: '100%', 
  border: '1px solid black',
  boxShadow: '0px 5px 5px rgba(58, 56, 56, 0.5)',
  padding: '3vh',
  marginBottom: '2vh',
  borderRadius: 8
}
const resultBoxStyle = {
  display: 'flex',
  flexBasis: 'auto',
  border: '1px solid #ccc',
  padding: '2vh',
  margin: '2vh',
  width: '80%',
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
}

const box1Style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '40%',
  height: '100%',
  marginRight: '2vh',
  
  cursor: 'pointer'
}

const box2Style = {
  alignItems: 'flex-start', width: '60%', cursor: 'pointer',
}

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const CarType = () => {
    const [open, setOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({ title: '', content: null });

    const handleOpen = (title, content) => {
        setPopupContent({title, content});
        setOpen(true);
  };

  const handleClose = () => setOpen(false);

    return ( 
      <Grid sx={gridStyle}>
        <Box sx={searchBoxStyle}>
          <Typography>제조사별</Typography>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>현대</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>기아</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>테슬라</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>BMW</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>벤츠</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>르노삼성</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>닛산</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>한국GM</Button>
          <Typography sx={{marginTop: '1vh'}}>충전방식</Typography>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>DC콤보<br/>(급속)</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>AC완속<br/>(5핀)</Button>
          <Button variant="outlined" sx={{marginRight: '1vh'}}>AC완속<br/>(7핀)</Button>
          <Typography sx={{marginTop: '1vh'}}>차량검색</Typography>
          <SearchInput/>
        </Box>
        <Box sx={resultBoxStyle} >
          <Box sx ={box1Style} 
            onClick={() => handleOpen('Car Photo', <CarPhotoAPI />)}>
            <CarPhotoAPI />
          </Box>
          <Box sx={box2Style}
            onClick={() => handleOpen('Car Details', <CarAPI />)}>
            <CarAPI />
          </Box>
          <Modal
            open={open}
            onClose={handleClose}>
          <Box
            onClick={handleClose} 
            sx={ModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {popupContent.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {popupContent.content}
          </Typography>
          </Box>
          </Modal>
        </Box>
    </Grid>
    );
}

export default CarType;