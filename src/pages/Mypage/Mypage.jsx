import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, useMediaQuery } from '@mui/material';

// 반응형 바꾼 것 -> 논의
// 사진 진짜 추가되게
// username 자동으로 비교
// 일치하는 검색결과 없음을 알리기

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
        setNotFound(!car); // 일치하는 차량 번호가 없을 때 notFound를 true로 설정
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    backgroundColor: 'white', 
                    borderRadius: 1, 
                    boxShadow: 3, 
                    p: 1, 
                    mb: 3,
                    width: isMobile ? '80%' : '60%'
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="차량 번호를 입력하세요"
                    value={regiNumber}
                    onChange={handleInputChange}
                    sx={{ flexGrow: 1, mr: 1, margin: 2 }}
                />
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleSearch}
                    sx={{ height: '56px', marginRight: 2 }}
                >
                    검색
                </Button>
            </Box>
            {selectedCar ? (
                <Grid container spacing={3} sx={{ width: '100%', maxWidth: '1000px' }}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1, boxShadow: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                차량 정보
                            </Typography>
                            <Typography>차량 제조사: {selectedCar.CARVENDER}</Typography>
                            <Typography>차량 이름: {selectedCar.CARNAME}</Typography>
                            <Typography>연식: {selectedCar.CARYEAR}</Typography>
                            <Typography>연료: {selectedCar.FUEL}</Typography>
                            <Typography>가격: {selectedCar.PRICE}</Typography>
                            <Typography>배기량: {selectedCar.CC}</Typography>
                        </Box>
                    </Grid>
                    {selectedCar.CARURL && (
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1, boxShadow: 3 }}>
                                <img src={selectedCar.CARURL} alt={selectedCar.CARNAME} style={{ width: '100%', maxWidth: '400px' }} />
                            </Box>
                        </Grid>
                    )}
                </Grid>
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
