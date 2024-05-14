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
    <div>
      <h2>배터리 잔여량</h2>
      <div style={{ display: 'flex', alignItems:'center', marginTop:'20px'}}>
        <div style={{display: 'inline-block', width: '450px', backgroundColor: 'lightgrey'}}>
        <div style={{width: `${batteryLevel}%`, height: '20vh',backgroundColor: barColor}}></div>
        </div>
        <div style = {{display: 'inline-block', fontSize: '18px', marginLeft: '20px', color: textColor}}>현재 배터리는 {batteryLevel}% 입니다
        <p style={{ color: 'red' }}>{message}</p>
        </div>
        </div>
      </div>


  );
}

export default BatteryLevel;