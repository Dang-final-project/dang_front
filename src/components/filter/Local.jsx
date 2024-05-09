import React, { useState } from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Button from "@mui/material/Button";

const Local = () => {
    const [anchor, setAnchor] = useState(null);

    const handleToggle = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;

    return ( 
        <div>
            <Button variant="outlined" onClick={handleToggle}>
                지역
                {/* 카드 만들어지면 import 하기 */}
            </Button>
            <BasePopup id={id} open={open} anchor={anchor}>
                <PopupBody>
                    <StyledInput type="text" className="underline-input" placeholder="예) 판교역166" />
                    <Button type='submit'>검색</Button>
                    <div>
                      <h1>tip</h1>
                      <h2>아래와 같은 조합으로 검색을 하시면 <br />
                          더욱 정확한 결과가 검색됩니다.
                      </h2>
                      <h3>도로명 + 건물 번호</h3>
                      <p>예) 판교역로 166, 제주 첨단로242</p>
                      <h3>지역명(동/리) + 번지</h3>
                      <p>예) 백현동 532, 제주 영평동 2181</p>
                    </div>
                    <Button type='button'>닫기</Button>
                </PopupBody>
            </BasePopup>
        </div>
    );
}

// const StyledDiv = styled.div`
//   p {
//     color: blue; 
//   }
// `;

const StyledInput = styled('input')`
    border: none;
    border-bottom: 2px solid black;
    outline: none;
    padding: 5px 10px;
    width: 75%
`;
const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };
  
  const PopupBody = styled('div')(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    z-index: 1;
  `
); 
  
  

export default Local;