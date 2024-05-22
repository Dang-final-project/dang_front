import { Stack, Typography, Box, Button } from "@mui/material";
import { FilterValue } from "../FilterGroup/FilterValue";
import { useEffect, useState } from "react";

export const FilterContent = () => {

    // 기능 개발 미완성
    const [filterButtons, setFilterButtons] = useState();
    // const test = (fk) => {
    //     console.log(filter[fk])
    //     setFilter({...filter, [fk]: !filter[fk]})
    // }
    // const test2 = (fk, v) => {
    //     setFilter({...filter, [fk]: v})
    // }

    console.log(filterButtons);

    return ( 
        <Stack spacing={2}>
            {
                FilterValue.map((f,idx) => {
                    return (
                        <Box key={idx}>
                            <Box sx={{display:'flex', gap:'4px', color:"grey.700"}}>
                                {f.icon}
                                <Typography>{f.label}</Typography>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                {/* {
                                    f.needPopup ?
                                    f.filterValue.map((value,idx)=>(
                                        <Button key={idx} variant={filter[f.filterKey]==null ?"contained" : "outlined"} onClick={()=> test2(f.filterKey, value)}>{value}</Button>
                                    ))
                                    :
                                    <Button key={idx} variant={filter[f.filterKey] ? "contained" : "outlined"} onClick={()=> test(f.filterKey)}>{f.label}</Button>
                                } */}
                                {
                                    f.needPopup ?
                                    f.filterValue.map((value,idx)=>(
                                        <Button key={idx} variant="outlined">{value}</Button>
                                    ))
                                    :
                                    <Button key={idx} variant="outlined">{f.label}</Button>
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
 