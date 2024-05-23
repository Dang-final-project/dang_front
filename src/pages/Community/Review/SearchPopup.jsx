import React, { useContext, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useTheme, Button, Dialog, DialogTitle, DialogContent, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import SearchInput from "../../../components/input/SearchInput";
import { MapContext } from "../../../contexts/MapContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function SearchPopup({ title, width = 500, height = 500}) {
    const { setStations } = useContext(MapContext);
    const [open, setOpen] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const theme = useTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value);
    };

    const handleSearch = async () => {
        if (!searchWord) {
            return;
        }

        const key = process.env.REACT_APP_STATION_API_KEY;
        const pageIdx = 1;
        const count = 1580;
        const url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&numOfRows=${count}&pageNo=${pageIdx}`;

        try {
            const response = await axios.get(url);
            const datas = response.data?.items || [];

            if (response.status === 200) {
                const filteredStations = datas.filter((station) =>
                    station.chrstnNm.toUpperCase().includes(searchWord.toUpperCase().replace(/\s+/g, ""))
                );
                setStations(filteredStations);
                setSearchResults(filteredStations);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const dialogContentProps = {
        sx: { width: width, height: height },
        ...(title && { dividers: true }),
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                찾아보기
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    내가 다녀온 충전소 찾기
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
                    <SearchInput
                        onClick={handleSearch}
                        handleSearchChange={handleSearchChange}
                    />
                    {searchResults.length > 0 ? (
                        <List>
                            {searchResults.map((station, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={station.chrstnNm} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>검색 결과를 찾을 수 없습니다.</Typography>
                    )}
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}