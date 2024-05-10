import { Box, Button, InputBase, Paper, TextField } from "@mui/material";

const SearchInput = (width) => {
    return ( 
        <Box width={width} sx={{display:'flex', gap:'4px'}}>
            <TextField sx={{flexGrow:'1'}} placeholder="검색어를 입력하세요." size="small" />
            <Button variant="contained" color="primary">검색</Button>
        </Box>
     );
}
 
export default SearchInput;