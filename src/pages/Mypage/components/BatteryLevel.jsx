import { Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import batteryImage from './battery.png';

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
    <Grid container sx={{display: "flex", flexDirection: "column", alignItems:'left', justifyContent: "center", position: 'relative' }}>
    <Typography variant="h5" >배터리잔량</Typography>
    <Box sx={{display: 'flex'}}>
      <Box sx={{ display: 'flex', alignItems:'center', marginLeft:3}}>
        <Box sx={{display: 'inline-block', width: 320, marginTop: 7, marginBottom: 5, backgroundColor: 'lightgrey'}}>
        <Box sx={{width: `${batteryLevel}%`, height: 160,backgroundColor: barColor}}></Box>
        </Box>
        <Box sx = {{display: 'inline-block', fontSize: 18, marginLeft: 10, color: textColor, position: 'relative', zIndex: 1}}> 
        <Typography>배터리 잔량이 {batteryLevel}% 남았습니다.</Typography>
        <Typography sx={{ color: 'red' }}>{message}</Typography>
        </Box>
        </Box>
        <Box
          component="img"
          src={batteryImage}
          sx={{
            position: 'absolute',
            width: '100%',
            maxWidth: 400,
            height: 'auto',
            top: '50%', // 부모 요소의 상단에 맞추기
            transform: 'translateY(-45%)',
            zIndex: 0, // 이미지가 박스 뒤로 가도록 설정
          }}
        />
      </Box>
    </Grid>
    </>
  );
}

export default BatteryLevel;