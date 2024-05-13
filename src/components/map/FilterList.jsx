import { Paper, Button } from "@mui/material";
import Local from "../filter/Local";
import Conect from "../filter/Conect";
import Empty from "../filter/Empty";
import Speed from "../filter/Speed";
import Using from "../filter/Using";

const FilterList = () => {

    return ( 
        <Paper square fullwidth="true" bgcolor='pink' sx={{py:1 ,px:3 ,display:'flex', gap:'8px'}}>
            <Local />
            <Empty />
            <Conect />
            <Speed />
            <Using />
        </Paper>
     );
}
 
export default FilterList;