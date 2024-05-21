import { Stack, Typography, Box, Button } from "@mui/material";
import { FilterValue } from "../FilterGroup/FilterValue";
import { useState } from "react";

export const FilterContent = () => {

    //const [btnClicked, setBtnClicked] = useState(false);

    console.log(FilterValue[3].filterValue.length)

    const [filterData, setFilterData] = useState();

    //단일버튼
    const selectSingleBtn = (index) => {
        const { filterKey, filterValue } = FilterValue[index];
        
    }

    //복합버튼

    return ( 
        <Stack spacing={2}>
            {
                FilterValue.map((filter,idx) => {
                    return (
                        <Box key={idx}>
                            <Box sx={{display:'flex', gap:'4px', color:"grey.700"}}>
                                {filter.icon}
                                <Typography>{filter.label}</Typography>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                {
                                    filter.needPopup ?
                                    filter.filterValue.map((value,idx)=>(
                                        <Button key={idx} variant="outlined">{value}</Button>
                                    ))
                                    :
                                    <Button key={idx} variant="outlined" onClick={selectSingleBtn(idx)}>{filter.label}</Button>
                                }
                            </Stack>
                        </Box>
                    )
                })
            }
            <Button variant="contained">적용</Button>
        </Stack>
     );
}
 