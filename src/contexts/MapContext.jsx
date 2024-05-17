import React, { createContext, useState, useEffect } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [stations, setStations] = useState([]);
    const [favStation, setFavStation] = useState([]);
    const [favList, setFavList] = useState([]);
    const [positionArr, setPositionArr] = useState();
    const [filterList, setFilterList] = useState({});
    const [mapPos, setMapPos] = useState();

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(pos => {
        setMapPos({lat:pos.coords.latitude, lng:pos.coords.longitude});
      }, err => {
        setMapPos({lat:37.261911, lng:127.030736});
      })
    }, []);
    
  return (
    <MapContext.Provider 
        value={{ 
            stations, setStations, 
            favStation, setFavStation,
            favList, setFavList,
            positionArr, setPositionArr,
            filterList, setFilterList,
            mapPos, setMapPos,
        }}
    >
      {children}
    </MapContext.Provider>
  );
};