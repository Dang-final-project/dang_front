import axios from "axios";
import { useState, useEffect, useContext, useCallback } from "react";
import { IconButton } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { MapContext } from "../../../../contexts/MapContext";

const LikeButton = ({ token, station, getFav, tab, clicked, setClicked }) => {
    const { favList, setFavList } = useContext(MapContext);

    const addStation = async (e) => {
        //e.stopPropagation()
        if (clicked === false) {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/stations/add`,
                    { chrstn_id: station.chrstn_id },
                    {
                        headers: {
                            'Authorization': `${token}`
                        }
                    }
                );
                if (res.data.code === 200) {
                    getFav();
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
                const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/stations/remove`, {
                    data: { chrstn_id: station.chrstn_id },
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                if (res.data.code === 200) {
                    getFav();
                    tab === 'fav' ? setClicked(true): setClicked(!clicked);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };
    

    // useEffect(()=>{
    //     getFav();
    //     setClicked(favList.some(f => station.chrstn_id === f.chrstn_id))
    // },[])
    
    useEffect(() => {
        getFav();
        if (favList.length > 0) {
            setClicked(favList.some(f => station.chrstn_id === f.chrstn_id));
        }
    }, []);

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