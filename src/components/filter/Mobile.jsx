import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PlaceIcon from '@mui/icons-material/Place';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PowerIcon from '@mui/icons-material/Power';
import SpeedIcon from '@mui/icons-material/Speed';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import PaymentIcon from '@mui/icons-material/Payment';
import Person2Icon from '@mui/icons-material/Person2';
import { Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function Mobile({ title, width = 500, height = 500, children }) {
    const [open, setOpen] = React.useState(false);

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

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} sx={{ ...btnStyle, color: open ? 'primary' : 'grey.800' }}>
                <FilterAltIcon fontSize="large" />
                <Typography>필터검색</Typography>
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    필터 검색
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
                    <label>
                        <PlaceIcon />지역
                    </label>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel htmlFor="grouped-select">도</InputLabel>
                        <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value={1}>Option 1</MenuItem>
                            <MenuItem value={2}>Option 2</MenuItem>
                        </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel htmlFor="grouped-select">시/군/구</InputLabel>
                        <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value={1}>Option 1</MenuItem>
                            <MenuItem value={2}>Option 2</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                    <label>
                        <StyledLocalOfferIcon /> 브랜드
                    </label>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value={1}>환경부</MenuItem>
                            <MenuItem value={2}>LG</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    
                    <label>
                        <PowerIcon />커넥트
                    </label>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value={1}>AC3 상</MenuItem>
                            <MenuItem value={2}>DC 콤보</MenuItem>
                            <MenuItem value={3}>무선</MenuItem>
                            <MenuItem value={4}>완속</MenuItem>
                            <MenuItem value={5}>이동형</MenuItem>
                            <MenuItem value={6}>차 데모</MenuItem>
                            <MenuItem value={7}>테슬라</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    <label>
                        <SpeedIcon />충전 속도
                    </label>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value={1}>급속</MenuItem>
                            <MenuItem value={2}>완속</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    <label>
                        <ToggleOnIcon />사용 여부
                    </label>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value={1}>사용 가능</MenuItem>
                            <MenuItem value={2}>사용 중</MenuItem>
                            <MenuItem value={3}>사용 불가</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    <label>
                        <PaymentIcon /> 결제 방법
                    </label>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value={1}>현금 충전</MenuItem>
                            <MenuItem value={2}>QR 충전</MenuItem>
                            <MenuItem value={3}>모두 보기</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                    <label>
                        <Person2Icon />외부인 개방
                    </label>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value={1}>외부인 개방</MenuItem>
                          </Select>
                        </FormControl>
                    </div>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

const StyledLocalOfferIcon = styled(LocalOfferIcon)({
    transform: 'scaleX(-1)',
});

const btnStyle = {
    flexGrow: '1', 
    display: 'flex', 
    flexDirection: 'column',
    gap: '4px'
};
