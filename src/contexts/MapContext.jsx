import React, { createContext, useState, useEffect } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [stations, setStations] = useState([]);
    const [favStation, setFavStation] = useState([]);
    const [favList, setFavList] = useState([]);
    const [positionArr, setPositionArr] = useState();
    const [filterList, setFilterList] = useState({})

  return (
    <MapContext.Provider 
        value={{ 
            stations, 
            setStations, 
            favStation, 
            setFavStation,
            favList,
            setFavList,
            positionArr,
            setPositionArr,
            filterList,
            setFilterList
        }}
    >
      {children}
    </MapContext.Provider>
  );
};