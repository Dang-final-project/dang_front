import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MapContext } from "../../contexts/MapContext";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import '@fontsource/roboto/300.css';

const Detail = ({ open, handleClose, detailIndex }) => {
    const { stations } = useContext(MapContext);
    console.log(stations, detailIndex);
    // 첫 번째 충전소 정보를 사용합
    const stationInfo = stations.length > 0 ? stations[detailIndex] : null;

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
                {stationInfo && (
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="h5">{stationInfo.chrstnNm}</ListSubheader>
                        }
                    >
                        <ListItemText primary="운영시간" secondary={stationInfo.useOpenTime} />
                        <ListItemText primary="도로명 주소" secondary={stationInfo.rdnmadr} />
                        <ListItemText primary="운영기관" secondary={stationInfo.manage_entrps_nm} />
                        <ListItemText primary="충전기 타입" secondary={stationInfo.chrstnType} />
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Detail;
