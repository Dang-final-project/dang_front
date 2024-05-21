import * as React from "react";
import {Button, Grid} from "@mui/material";
import { MapContext } from "../../../../contexts/MapContext";
import FilterPopup from "./FilterPopup";

export function FilterPopupButton({label, filterKey, filterValue, Separator}) {

    const [open, setOpen] = React.useState(false);

    const { filterList, setFilterList} = React.useContext(MapContext);
    // //필터 데이터 전송
    const [activeButtons, setActiveButtons] = React.useState([]);
    const [connectList, setConnectList] = React.useState("");
    
    // 중복 선택 가능 버튼
    const handleMultipleSelete = (type) => {
        setActiveButtons((prev) => {
            const updatedList = prev.includes(type)
                ? prev.filter(item => item !== type)
                : [...prev, type];
            setConnectList(updatedList.join(Separator))
            return updatedList;
        });
    };

    // 단일 선택 버튼
    const handleSingleSelete = (type) => {
        setActiveButtons((prev) => {
            const updateList = prev.includes(type) ? [] : [type]
            setConnectList(updateList.toString());
            return updateList;
        });
    }

    const getFilterVal = () => {
        setFilterList(prev => ({...filterList,[filterKey] :connectList}));
      }

    return(
        <>
            <Button variant="outlined" onClick={()=>setOpen(true)}>{label}</Button>
            {
                open &&
                <FilterPopup title={label} open={open} setOpen={setOpen}>
                    <Grid container spacing={1}>
                        {filterValue.map((type,idx) => (
                            <Grid item key={idx}>
                                <Button
                                    onClick={() => Separator ? handleMultipleSelete(type) : handleSingleSelete(type)}
                                    variant={activeButtons.includes(type) ? "contained" : "outlined"}
                                >
                                    {type}
                                </Button>
                            </Grid>
                        ))}
                        <Grid item xs={12} mt={3}>
                            <Button variant="contained" fullWidth onClick={getFilterVal}>적용</Button>
                        </Grid>
                    </Grid>
                </FilterPopup>
            }
        </>
    )
}