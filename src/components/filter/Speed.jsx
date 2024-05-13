import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { useState } from "react"; // useState import 추가

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function Speed({ title, width = 500, height = 100, children }) {
    const [open, setOpen] = React.useState(false);
    const [selectedSpeed, setSelectedSpeed] = useState(''); // useState 사용, 초기값은 빈 문자열

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dialogContentProps = {
        sx: { width: width, height: height },
        ...(title && { dividers: true }),
    };

    const handleSpeedClick = (speed) => {
        setSelectedSpeed(speed); // 선택된 속도로 설정
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                충전 속도
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    충전 속도
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent {...dialogContentProps}>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Button
                                variant={selectedSpeed === '급속' ? 'contained' : 'outlined'} // 선택된 속도에 따라 스타일 변경
                                size="large"
                                color="primary"
                                onClick={() => handleSpeedClick('급속')}
                            >
                                급속
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={selectedSpeed === '완속' ? 'contained' : 'outlined'} // 선택된 속도에 따라 스타일 변경
                                size="large"
                                color="primary"
                                onClick={() => handleSpeedClick('완속')}
                            >
                                완속
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}
