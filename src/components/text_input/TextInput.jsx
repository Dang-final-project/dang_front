import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

export const TextInput = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 680);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 680);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return ( 
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
                position: 'relative',
                margin: '20px',
                ...(isDesktop ? { // 데스크탑 화면일 때 추가 디자인요소
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                } : {}),
            }}
            noValidate
            autoComplete="off"
        >
            {isDesktop ? ( // 데스크탑 화면일 때
                <>
                    <InputLabel htmlFor="outlined-size-small" sx={{ mr: '20px' }}>label</InputLabel>
                    <TextField id="outlined-size-small" defaultValue="medium" size="medium"/>
                </>
            ) : ( // 모바일 화면일 때
                <>
                    <InputLabel sx={{ position: 'absolute', top: '-20px', left: '20px' }}>label</InputLabel>
                    <div>
                        <TextField id="outlined-size-small" defaultValue="medium" size="medium"/>
                    </div>
                </>
            )}
        </Box>
    );
}
