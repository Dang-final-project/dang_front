import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const LocationControl = ({ position, setPosition }) => {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
    }, [setPosition]);

    const comeBackHome = () => {
        setPosition(position);
    };

    return (
        <IconButton color="primary" onClick={comeBackHome}>
            <GpsFixedIcon />
        </IconButton>
    );
};

export default LocationControl;
