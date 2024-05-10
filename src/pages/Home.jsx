import FilterList from '../components/map/FilterList';
import SearchBox from '../components/map/SearchBox';
import LocateList from '../components/map/LocateList';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect } from 'react';
import { Box, Paper, ButtonGroup, Button } from '@mui/material';
import BottomBtns from '../components/map/BottomBtns'
import KakaoMap from '../components/map/KakaoMap';
import { Map } from 'react-kakao-maps-sdk';

    const Home = () => {
        //반응형분기점
        const theme = useTheme();
        const tabletWidth = useMediaQuery(theme.breakpoints.up('md'));

        return (
            <>
             <KakaoMap>
                    <div>
                        
                        {
                            tabletWidth ? (
                                <Box>
                                    <FilterList />
                                    <Box sx={{width:'40%', display:'flex', flexDirection:'column', gap:'16px', p:3}}>
                                        <SearchBox />
                                        <LocateList />
                                    </Box>
                                </Box>
                            )
                            :
                            (
                                <BottomBtns />
                            )
                        }
                    </div>
                </KakaoMap>
            </>
               
            );
    }

    export default Home;