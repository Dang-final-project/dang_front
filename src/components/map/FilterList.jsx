import { Paper, Button } from "@mui/material";

const FilterList = () => {

    return ( 
        <Paper square fullwidth="true" bgcolor='pink' sx={{py:1 ,px:3 ,display:'flex', gap:'8px'}}>
            <Button  variant="outlined">필터01</Button>
            <Button  variant="outlined">필터01</Button>
            <Button  variant="outlined">필터01</Button>
        </Paper>
     );
}
 
export default FilterList;