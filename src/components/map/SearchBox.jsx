import { Paper } from "@mui/material";
import SearchInput from "../input/SearchInput";

const SearchBox = ({ onClick, handleSearchChange }) => {
    return (
        <Paper sx={{ p: 2, maxWidth: "460px" }}>
            <SearchInput onClick={onClick} handleSearchChange={handleSearchChange} />
        </Paper>
    );
};

export default SearchBox;
