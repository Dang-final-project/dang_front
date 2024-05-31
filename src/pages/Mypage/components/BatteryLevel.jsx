import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';
import batteryImage from './battery.png';

// 1. 배터 잔여량 가라 보여주는 랜덤 구현!!
// 1-1. 마이페이지에 layout (common component)
// 1-2. mypage random logic

function BatteryLevel() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const isMobile = useMediaQuery('(max-width:1000px)');

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
    <Grid container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', width: '100%' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>배터리잔량</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 600, flexDirection: 'row', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        <Box sx={{ position: 'relative', width: isMobile ? '50%' : '100%', marginRight: isMobile ? 0 : 2, aspectRatio: '2 / 1', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Box sx={{ position: 'absolute', top: '20%', left: '5%', width: '81%', height: '70%', backgroundColor: 'lightgrey', zIndex: 1 }}>
              <Box sx={{ width: `${batteryLevel}%`, height: '100%', backgroundColor: barColor }}></Box>
            </Box>
            <Box
              component="img"
              src={batteryImage}
              sx={{
                width: '100%',
                height: '170%',
                position: 'absolute',
                top: '-30%', 
                left: 0,
                zIndex: 2,
              }}
            />
          </Box>
        </Box>
        <Box sx={{width: isMobile ? '50%' : 'auto', color: textColor, textAlign: 'left', paddingLeft: isMobile ? 1 : 2, paddingTop: isMobile ? 0 : 2 }}>
          <Typography>배터리 잔량이 {batteryLevel}% 남았습니다. {message}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default BatteryLevel;