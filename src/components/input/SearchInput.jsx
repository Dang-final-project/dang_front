import { Box, Button, TextField } from "@mui/material";

const SearchInput = ({ width, onClick, handleSearchChange }) => {
    return (
        <Box width={width} sx={{ display: "flex", gap: "4px" }}>
            <TextField
                sx={{ flexGrow: "1" }}
                placeholder="검색어를 입력하세요."
                size="small"
                onChange={handleSearchChange}
            />
            <Button variant="contained" color="primary" onClick={onClick}>
                검색
            </Button>
        </Box>
    );
};

export default SearchInput;
