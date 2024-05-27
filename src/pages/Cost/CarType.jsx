import React, { useState } from "react";
import { Grid, Box, Button, Typography, Modal } from "@mui/material";
import CarAPI from "./CarAPI";
import CarPhotoAPI from "./CarPhotoAPI";
import SearchInput from "./../../components/input/SearchInput";

const gridStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    marginTop: "1vh",
};
const searchBoxStyle = {
    width: "100%",
    border: "1px solid black",
    padding: "3vh",
    marginBottom: "2vh",
};
const resultBoxStyle = {
    marginTop: "2vh",
    width: "100%",
};

const CarType = () => {
    const [open, setOpen] = useState(false);

    return (
        <Grid sx={gridStyle}>
            <Box sx={searchBoxStyle}>
                <Typography>제조사별</Typography>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    현대
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    기아
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    테슬라
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    BMW
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    벤츠
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    르노삼성
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    닛산
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    한국GM
                </Button>
                <Typography sx={{ marginTop: "1vh" }}>충전방식</Typography>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    DC콤보
                    <br />
                    (급속)
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    AC완속
                    <br />
                    (5핀)
                </Button>
                <Button variant="outlined" sx={{ marginRight: "1vh" }}>
                    AC완속
                    <br />
                    (7핀)
                </Button>
                <Typography sx={{ marginTop: "1vh" }}>차량검색</Typography>
                <SearchInput />
            </Box>

            <Box sx={resultBoxStyle}>
                <Box sx={{cursor: 'pointer', display: 'flex'}} >
                    <CarPhotoAPI />
                </Box>
            </Box>
        </Grid>
    );
};

export default CarType;
