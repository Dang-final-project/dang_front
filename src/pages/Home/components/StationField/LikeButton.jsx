import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { IconButton } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { MapContext } from "../../../../contexts/MapContext";
import { stationApi } from "../../../../api/services/station";

const LikeButton = ({ token, station, getFav, tab, clicked, setClicked }) => {
    const { favList, setFavList, positionArr, setPositionArr, favStation } = useContext(MapContext);

    const addStation = async (e) => {
        //e.stopPropagation()
        if (clicked === false) {
            try {
                const data = { chrstn_id: station.chrstn_id };
                const res = await stationApi.addLikeStation(data, token)
                if (res.data.code === 200) {
                    getFav();
                    const newPA = positionArr.map(pa => {
                        if (pa.title === station.chrstnNm) {
                            return {...pa, fav: true}
                        }
                        return pa
                    })
                    setPositionArr(newPA)
                    setClicked(true)
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const deleteStation = async (e) => {
        //e.stopPropagation()
        if (clicked === true) {
            try {
                const data = { chrstn_id: station.chrstn_id };
                const res = await stationApi.deleteLikeStation(data, token)
                if (res.data.code === 200) {
                    getFav();
                    const newPA = positionArr.map(pa => {
                        console.log(pa, station);
                        if (pa.fav && pa.title === station.chrstnNm) {
                            return {...pa, fav: false }
                        }
                        return pa
                    })
                    setPositionArr(newPA)
                    tab === 'fav' ? setClicked(true): setClicked(!clicked);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        const fetchFavList = async () => {
            await getFav();
        };
        fetchFavList();
    }, []); 

    useEffect(() => {
        if (favList?.length > 0) {
            setClicked(favList.some(f => station.chrstn_id === f.chrstn_id));
        }
    }, [favList, station.chrstn_id]); 

    return ( 
        <>
            {clicked ?
                <IconButton aria-label="like" onClick={(e) => deleteStation(e)}>
                    <StarIcon color="secondary" fontSize="large"/>
                </IconButton>
                :
                <IconButton aria-label="unlike" onClick={(e) => addStation(e)}>
                    <StarBorderIcon fontSize="large"/>
                </IconButton>
            }
        </>
     );
}
 
export default LikeButton;