import { Paper } from "@mui/material";
import SearchInput from "../input/SearchInput";

const SearchBox = () => {

    return ( 
        <Paper sx={{p:2, maxWidth:'460px'}}>
            <SearchInput />
        </Paper>
     );
}
 
export default SearchBox;