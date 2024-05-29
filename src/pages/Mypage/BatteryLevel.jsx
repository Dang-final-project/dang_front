import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';
import batteryImage from './Mypage/battery.png';

function BatteryLevel() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');;

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
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>배터리 잔량</Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: isMobile ? '200px' : '400px', height: 'auto', bgcolor: 'lightgrey', position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid #000' }}>
              <Box sx={{ width: `${batteryLevel}%`, height: '20px', bgcolor: barColor }} />
            </Box>
            <Typography sx={{ mt: 2, fontSize: isMobile ? 14 : 18, color: textColor }}>
              {`배터리 잔량이 ${batteryLevel}% 남았습니다.`}
            </Typography>
            {batteryLevel <= 20 && <Typography sx={{ color: 'red' }}>{message}</Typography>}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: isMobile ? '100px' : '200px' }}>
              <img src={batteryImage} alt="Battery Image" style={{ width: '100%', height: 'auto' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BatteryLevel;