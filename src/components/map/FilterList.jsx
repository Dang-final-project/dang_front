import { Paper, Button } from "@mui/material";
import Local from "../filter/Local";
import Conect from "../filter/Conect";
import Empty from "../filter/Empty";
import Speed from "../filter/Speed";
import Using from "../filter/Using";
import Pay from './../filter/Pay';
import Open from './../filter/Open';
import Manage from "../filter/Manage";

const FilterList = () => {

    return ( 
        <Paper square fullwidth="true" bgcolor='pink' sx={{py:1 ,px:3 ,display:'flex', gap:'8px'}}>
            {/* <Local /> */}
            {/* <Empty /> */}
            <Conect />
            {/* <Speed /> */}
            {/* <Using /> */}
            {/* <Pay /> */}
            <Manage />
            <Open />
        </Paper>
     );
}
 
export default FilterList;