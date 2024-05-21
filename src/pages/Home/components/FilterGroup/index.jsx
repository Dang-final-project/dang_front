import { Paper } from "@mui/material";
import { FilterButton } from "./FilterButton";
import { FilterPopupButton } from "./FilterPopupButton";

export const FilterGroup = () => {

    return ( 
        <Paper square fullwidth="true" sx={{ py: 1, px: 3, display: "flex", gap: "8px" }}>
            <FilterButton label="외부인 개방" filterKey="user_restrict" filterValue={{active:"이용자 제한 없음",none:""}} />
            <FilterButton label="전용주차장" filterKey="privateCarPark" filterValue={{active:"O",none:"X"}} />
            <FilterButton label="24시간 이용가능" filterKey="useOpenTime" filterValue={{active:"24시간 이용가능",none:""}} />
            <FilterPopupButton label="커넥트" filterKey="chrstnType" filterValue={["AC3상","DC차데모","DC콤보"]} Separator="+" />
            <FilterPopupButton label="관리업체명" filterKey="manage_entrps_nm" filterValue={["환경부(한국자동차환경협회)","한국전력","제주전기자동차서비스"]} />
        </Paper>
     );
}
 