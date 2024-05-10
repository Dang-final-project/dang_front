import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ButtonBase from '@mui/material/ButtonBase';
import { Grid } from "@mui/material";


// 제목 넣고 싶을 때 -> <ContentsPopup title="title"></ContentsPopup>
// 내용 넣고 싶을 때 -> <ContentsPopup>안녕하세요</ContentsPopup>

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const images = [
  {
    url: '/buttonImage/AC3.png',
    width: '40%'
  }, {
    url: '/buttonImage/DC.png',
    width: '40%',
  }, {
    url: '/buttonImage/무선.png',
    width: '40%',
  },{
    url: '/buttonImage/완속.png',
    width: '40%',
  },{
    url: '/buttonImage/이동형.png',
    width: '40%',
  },{
    url: '/buttonImage/차데모.png',
    width: '40%',
  }
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 2,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 20,
  width: 150,
  height: 150,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 20,
  width: 150,
  height: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function Conect({ title }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dialogContentProps = {
        sx: { width: "500px", height: "500px" },
        ...(title && { dividers: true }),
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                커넥트
                {/* 카드 만들어지면 import 하기 */}
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                  커넥트 종류
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: 'grey.500'
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent {...dialogContentProps}>
                <Grid container spacing={2}>
                  {images.map((image) => (
                    <Grid item xs={12} sm={6} md={4} key={image.title}>
                      <ImageButton
                        focusRipple
                        style={{
                          width: '150px',
                        }}
                      >
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      </ImageButton>
                    </Grid>
                  ))}
                </Grid>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}
