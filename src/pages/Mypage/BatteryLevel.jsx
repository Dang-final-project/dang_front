import { Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

// 1. 배터 잔여량 가라 보여주는 랜덤 구현!!
// 1-1. 마이페이지에 layout (common component)
// 1-2. mypage random logic

function BatteryLevel() {
  const [batteryLevel, setBatteryLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBatteryLevel = Math.floor(Math.random() * 100) + 1; // 1부터 100 사이의 랜덤한 숫자 생성
      setBatteryLevel(newBatteryLevel);
    }, 5000); // 1초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 해제
  }, []); // []를 두번째 매개변수로 전달하여 처음 한 번만 실행되도록 함

  const barColor = batteryLevel <= 20 ? 'red' : '#336dff';
  const textColor = batteryLevel <= 20 ? 'red' : 'black';
  const message = batteryLevel <= 20 ? '어서 빨리 충전하세요' : '';

  return (
    <>
    
    <Grid sx={{display: "flex", flexDirection: "column", alignItems:'center', justifyContent: "center" }}>
    <Typography variant="h5">배터리잔량</Typography>
    <Box sx={{display: 'flex'}}>
      <Box sx={{ display: 'flex', alignItems:'center', marginTop:'20px'}}>
        <Box sx={{display: 'inline-block', width: '450px', backgroundColor: 'lightgrey'}}>
        <Box sx={{width: `${batteryLevel}%`, height: '20vh',backgroundColor: barColor}}></Box>
        </Box>
        <Box sx = {{display: 'inline-block', fontSize: '18px', marginLeft: '20px', color: textColor}}> 
        <Typography>배터리 잔량이 {batteryLevel}% 남았습니다.</Typography>
        <Typography sx={{ color: 'red' }}>{message}</Typography>
        </Box>
        </Box>
      </Box>
    </Grid>
    </>
  );
}

export default BatteryLevel;