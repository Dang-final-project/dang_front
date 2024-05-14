import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from '@mui/material';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '@fontsource/roboto/300.css';


function createData(name, value) {
    return { name, value };
}

const rows = [
    createData('도로명 주소', '강원특별자치도 춘천시 춘천로'),
    createData('운영기관', '환경부'),
];

const Detail = ({ open, handleClose }) => {
    const dialogContentProps = {
        sx: { width: "500px", height: "500px" },
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                상세보기
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
            </DialogTitle>
            <DialogContent {...dialogContentProps}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">OO 주차장</ListSubheader>
                    }
                >
                    <ListItemButton>
                        <ListItemText>
                        <Typography variant="subtitle1" gutterBottom>운영시간</Typography>
                        </ListItemText>
                        <ListItemText primary="9:00 ~ 18: 00" />
                    </ListItemButton>
                    <ListItemButton>
                    <ListItemText>
                        <Typography variant="subtitle1" gutterBottom>도로명 주소</Typography>
                        </ListItemText>
                        <ListItemText primary="제주도 카카오 본사" />
                    </ListItemButton>
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default Detail;
