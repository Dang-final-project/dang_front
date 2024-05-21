import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const FilterValue = [
    {
        label:"외부인 개방", 
        icon:<FilterAltIcon />,
        needPopup:false,
        filterKey:"user_restrict", 
        filterValue:{active:"이용자 제한 없음",none:""}
    },
    {
        label:"전용주차장", 
        icon:<FilterAltIcon />,
        needPopup:false,
        filterKey:"privateCarPark", 
        filterValue:{active:"O",none:""}
    },
    {
        label:"24시간 이용가능", 
        icon:<FilterAltIcon />,
        needPopup:false,
        filterKey:"useOpenTime", 
        filterValue:{active:"24시간 이용가능",none:""}
    },
    {
        label:"관리업체명", 
        icon:<FilterAltIcon />,
        needPopup:true,
        filterKey:"manage_entrps_nm", 
        filterValue:["환경부(한국자동차환경협회)","한국전력","제주전기자동차서비스"]
    },
    {
        label:"커넥트", 
        icon:<FilterAltIcon />,
        needPopup:true,
        filterKey:"chrstnType", 
        filterValue:["AC3상","DC차데모","DC콤보"], 
        Separator:"+"
    }
]
 