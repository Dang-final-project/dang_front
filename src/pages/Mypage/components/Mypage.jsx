import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, useMediaQuery } from '@mui/material';
import BatteryLevel from './BatteryLevel';

const Mypage = () => {
    const [carData, setCarData] = useState([]);
    const [regiNumber, setRegiNumber] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const isMobile = useMediaQuery('(max-width:680px)');

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch('/carInfo.json');
                if (!response.ok) {
                    throw new Error('error');
                }
                const data = await response.json();
                setCarData(data);
                const defaultCar = data.find((item) => item.REGINUMBER === '23사5678');
                setSelectedCar(defaultCar ? defaultCar.data : null);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCarData();
    }, []);

    const handleInputChange = (event) => {
        setRegiNumber(event.target.value);
    };

    const handleSearch = () => {
        const car = carData.find((item) => item.REGINUMBER === regiNumber);
        setSelectedCar(car ? car.data : null);
        setNotFound(!car);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, width: '100%' }}>
            <BatteryLevel />
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: 1, 
                    p: 1, 
                    mb: 3,
                    width: '100%',
                    maxWidth: '1000px',
                    marginTop: 5
                }}
            >
                <Typography sx={{ flexGrow: 1, ml: 2 }}>
                    차량 번호 <span style={{ color: 'blue', fontWeight: "bol" }}>7자리 혹은 8자리</span>를 입력해주세요.
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="차량 번호를 입력하세요"
                    value={regiNumber}
                    onChange={handleInputChange}
                    sx={{ flexGrow: 1, mr: 1, margin: 1, backgroundColor: '#fff' }}
                />
                <Button 
                    variant="contained" 
                    onClick={handleSearch}
                    sx={{ height: '40px', marginRight: 1, backgroundColor: '#007BFF' }}
                >
                    입력
                </Button>
            </Box>
            {selectedCar ? (
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        width: '100%', 
                        maxWidth: '1000px', 
                        border: '1px solid #ccc', 
                        borderRadius: 1, 
                        p: 2,
                        backgroundColor: 'white',
                        position: 'relative'
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {regiNumber}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Box 
                                component="img"
                                src={selectedCar.CARURL}
                                alt={selectedCar.CARNAME}
                                sx={{ width: '100%', borderRadius: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    차량 정보 {regiNumber}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>차량 제조사: {selectedCar.CARVENDER}</Typography>
                                        <Typography>연식: {selectedCar.CARYEAR}</Typography>
                                        <Typography>연료: {selectedCar.FUEL}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>차량 이름: {selectedCar.CARNAME}</Typography>
                                        <Typography>가격: {selectedCar.PRICE}원</Typography>
                                        <Typography>충전 커넥션: {selectedCar.CONNECTION}</Typography>
                                        <Typography>충전 속도: {selectedCar.CHARGING_SPEED}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        sx={{ position: 'absolute', bottom: 16, right: 16, backgroundColor: '#6c757d' }}
                    >
                        삭제
                    </Button>
                </Box>
            ) : (
                notFound && (
                    <Typography variant="h6" color="error" sx={{ mt: 3 }}>
                        일치하는 차량 번호가 없습니다.
                    </Typography>
                )
            )}
        </Box>
    );
};

export default Mypage;
