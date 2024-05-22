import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

// 해야할 것 
// 1. 반응형 추가
// 2. username 자체적으로 확인하게하기
// 3. 디자인? 더 예쁘게?
const Mypage = () => {
    const [carData, setCarData] = useState([]);
    const [regiNumber, setRegiNumber] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch('/carInfo.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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
                    mb: 3
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="차량 번호를 입력하세요"
                    value={regiNumber}
                    onChange={handleInputChange}
                    sx={{ flexGrow: 1, mr: 1, margin: 2}}
                    
                />
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleSearch}
                    sx={{ height: '56px' , marginRight: 2}}
                >
                    검색
                </Button>
            </Box>
            {selectedCar && (
                <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 1, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        차량 정보
                    </Typography>
                    <Typography>차량 제조사: {selectedCar.CARVENDER}</Typography>
                    <Typography>차량 이름: {selectedCar.CARNAME}</Typography>
                    <Typography>연식: {selectedCar.CARYEAR}</Typography>
                    <Typography>연료: {selectedCar.FUEL}</Typography>
                    <Typography>가격: {selectedCar.PRICE}</Typography>
                    <Typography>배기량: {selectedCar.CC}</Typography>
                    <Typography>미션: {selectedCar.MISSION}</Typography>
                    {selectedCar.CARURL && (
                        <Box mt={2}>
                            <img src={selectedCar.CARURL} alt={selectedCar.CARNAME} style={{ width: '100%', maxWidth: '400px' }} />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Mypage;
