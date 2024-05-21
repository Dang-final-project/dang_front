import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react"; 
import { MapContext } from "../../../../contexts/MapContext";

export function FilterButton({label, filterKey, filterValue}) {

    const { filterList, setFilterList} = React.useContext(MapContext);

    //필터 데이터 전송
    const [btnClicked, setBtnClicked] = useState(false);
    const getFilterVal = () => {
        if(btnClicked){
            setFilterList({...filterList,[filterKey] : filterValue.none});
            setBtnClicked(false);
        }else{
            setFilterList({...filterList,[filterKey] : filterValue.active}); 
            setBtnClicked(true);
        }
    }

    return (
        <Button
            variant={btnClicked ? 'contained' : 'outlined'}
            size="large"
            color="primary"
            onClick={getFilterVal}
        >
            {label}
        </Button>
    )
}

