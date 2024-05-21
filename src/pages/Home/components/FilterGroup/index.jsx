import { Paper } from "@mui/material";
import { FilterButton } from "./FilterButton";
import { FilterPopupButton } from "./FilterPopupButton";
import { FilterValue } from "./FilterValue";

export const FilterGroup = () => {

    return ( 
        <Paper square fullwidth="true" sx={{ py: 1, px: 3, display: "flex", gap: "8px" }}>
            {
                FilterValue.map((filter,idx) => (
                    filter.needPopup ?
                    (<FilterPopupButton key={idx} label={filter.label} filterKey={filter.filterKey} filterValue={filter.filterValue} Separator={filter.Separator} />)
                    :
                    (<FilterButton key={idx} label={filter.label} filterKey={filter.filterKey} filterValue={filter.filterValue} />)
                ))
            }
        </Paper>
     );
}
 