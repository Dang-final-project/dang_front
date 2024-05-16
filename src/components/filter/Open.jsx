import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { useState } from "react"; 
import { MapContext } from "../../contexts/MapContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function Open({ title, width = 500, height = 100, children }) {

    //팝업 기능
    const [open, setOpen] = React.useState(false);
    const { filterList, setFilterList} = React.useContext(MapContext);
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

    //필터 데이터 전송
    const [btnClicked, setBtnClicked] = useState(false);
    const getFilterVal = () => {
        setBtnClicked((btnClicked)=>!btnClicked);
        if(btnClicked){
            setFilterList({...filterList,privateCarPark : 'O'});
        }else{
            setFilterList({...filterList,privateCarPark : ''});
        }
    }


    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                외부인개방
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    외부인개방
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
                                variant={btnClicked ? 'outlined' : 'contained'}
                                size="large"
                                color="primary"
                                onClick={getFilterVal}
                            >
                                외부인개방
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}
