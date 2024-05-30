import React, { useState } from "react";
import SearchInput from "../../../components/input/SearchInput";

const StationSearch = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <SearchInput
            width="60%"
            handleSearchChange={handleSearchChange}
            onClick={handleSearch}
        />
    );
};

export default StationSearch;