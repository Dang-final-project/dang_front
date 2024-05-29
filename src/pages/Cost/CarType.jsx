import React, { useState } from "react";
import { Grid, Box, Button, Typography, Modal, useMediaQuery } from "@mui/material";
import CarPhotoAPI from "./CarPhotoAPI";
import SearchInput from "./../../components/input/SearchInput";

const resultBoxStyle = {
    marginTop: "2vh",
    width: "80%",
};

const getHomepageURL = (manufacturer) => {
    switch (manufacturer) {
        case "현대":
            return "https://www.hyundai.com";
        case "기아":
            return "https://www.kia.com";
        case "BMW":
            return "https://www.bmw.co.kr";
        case "벤치":
            return "https://www.mercedes-benz.co.kr/";
        case "테슬라":
            return "https://www.tesla.com/ko_kr";
        case "르노삼성":
            return "https://www.renault.co.kr/";
        case "닛산":
            return "https://www.nissan.co.kr/";
        case "한국GM":
            return "https://www.gm-korea.co.kr/";
        default:
            return "";
    }
};

const handleHomepageRedirect = (manufacturer) => {
    const homepageURL = getHomepageURL(manufacturer);
    if (homepageURL) {
        window.location.href = homepageURL;
    } else {
        console.error("홈페이지 URL을 찾을 수 없습니다.");
    }
};

const CarType = () => {
    const [selectedCars, setSelectedCars] = useState([]);
    const [selectedChargingTypes, setSelectedChargingTypes] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [open, setOpen] = useState(false);

    const isMobile = useMediaQuery("(max-width:600px)");

    const handleCarClick = (manufacturer) => {
        if (selectedCars.includes(manufacturer)) {
            setSelectedCars(selectedCars.filter((car) => car !== manufacturer));
        } else {
            setSelectedCars([...selectedCars, manufacturer]);
        }
    };

    const handleChargingTypeClick = (chargingType) => {
        if (selectedChargingTypes.includes(chargingType)) {
            setSelectedChargingTypes(selectedChargingTypes.filter((type) => type !== chargingType));
        } else {
            setSelectedChargingTypes([...selectedChargingTypes, chargingType]);
        }
    };

    const handleCarDetailClick = (car) => {
        setSelectedCar(car);
        setOpen(true);
    };

    return (
        // <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(modify)}
        //         sx={{width: "400px", padding: "40px", backgroundColor: "white", borderRadius: "8px", 
        //         boxShadow:"0 0 12px rgba(0,0,0,0.271)", textAlign: "center", 
        //         '& .MuiTextField-root': { marginTop: 1 }}}
        //     ></Box>
        <Grid
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                padding: isMobile ? "1vh" : "2vh",
                boxSizing: "border-box",
            }}
        >
            <Box sx={{
                width: isMobile ? "100%" : "900px", 
                padding: isMobile ? "20px" : "40px",
                backgroundColor: "white", 
                borderRadius: "8px", 
                boxShadow:"0 0 12px rgba(0,0,0,0.271)"}}>

                <Typography>제조사별</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {["현대", "기아", "테슬라", "BMW", "벤츠", "르노삼성", "닛산", "한국GM"].map((manufacturer) => (
                    <Button
                        key={manufacturer}
                        variant="outlined"
                        sx={{
                            marginRight: "1vh",
                            backgroundColor: selectedCars.includes(manufacturer) ? "lightgrey" : "white",
                            flexGrow: isMobile ? 1 : 0,
                            flexBasis: isMobile ? '45%' : 'auto'
                        }}
                        onClick={() => handleCarClick(manufacturer)}
                    >
                        {manufacturer}
                    </Button>
                ))}
                </Box>
                <Typography sx={{ marginTop: "2vh" }}>충전방식</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {["DC콤보 (급속)", "AC완속 (5핀)", "AC완속 (7핀)"].map((type) => (
                    <Button
                        key={type}
                        variant="outlined"
                        sx={{
                            marginRight: "1vh",
                            backgroundColor: selectedChargingTypes.includes(type) ? "lightgrey" : "white",
                            flexGrow: isMobile ? 1 : 0,
                            flexBasis: isMobile ? '45%' : 'auto'
                        }}
                        onClick={() => handleChargingTypeClick(type)}
                    >
                        {type}
                    </Button>
                ))}
                </Box>
                <Typography sx={{ marginTop: "2vh" }}>차량검색</Typography>
                <SearchInput />
            </Box>

            <Box sx={resultBoxStyle}>
                <CarPhotoAPI 
                    onCarClick={handleCarDetailClick} 
                    selectedCars={selectedCars}
                    selectedChargingTypes={selectedChargingTypes}    
                />
            </Box>

            <Modal open={open} onClose={() => setOpen(false)} onClick={() => setOpen(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: isMobile ? "90%" : "50%"}}>
                    {selectedCar && 
                    <>
                    <img src={`${selectedCar.image}&w=200&h=200&fit=crop`} style={{ width: '100%', marginBottom: 20 }} alt="car" />
                    <Typography variant="h6" component="strong">
                        모델명: {selectedCar.모델명}
                    </Typography>
                    <Typography variant="body1">제조사: {selectedCar.제조사}</Typography>
                    <Typography variant="body1">급속충전방식: {selectedCar.급속충전방식}</Typography>
                    <Typography variant="body1">완속충전방식: {selectedCar.완속충전방식}</Typography>
                    <Typography variant="body1">배터리용량: {selectedCar.배터리용량}</Typography>
                    <Typography variant="body1">출시일: {selectedCar.출시일}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                    <Button variant="outlined" sx={{height: 40, marginTop:4}} onClick={() => handleHomepageRedirect(selectedCar.제조사)}>
                    홈페이지로 이동
                    </Button>
                    </Box>
                    </>}
                </Box>
            </Modal>
        </Grid>
    );
};

export default CarType;
