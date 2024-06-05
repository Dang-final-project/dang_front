import { Box, Paper, styled, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../App.css";
import { useAuth } from "../../../hooks/useAuth";
import { MobileHeader } from "./MobileHeader";
import { DeskTopHeader } from "./DeskTopHeader";

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation();
    const { loginUser, kakaoLogin } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userStatus, setUserStatus] = useState("guest"); // guest, user, admin

    useEffect(() => {
        kakaoLogin();
        if (loginUser?.id) {
            setUserStatus("user");
        } else {
            setUserStatus("guest");
        }
    }, [loginUser]);

    const StyledTypo = styled(Typography)({
        cursor: "pointer",
        margin: "10px",
        color: "#4b4037",
        "&:hover": {
            color: theme.palette.primary.main,
        },
    });

    const ActiveNav = styled(StyledTypo)({
        fontWeight: "bold",
    });

    //유저 카드
    const MessageBox = () => {
        return (
            <Paper
                elevation={3}
                sx={{
                    width: "200px",
                    height: "120px",
                    position: "absolute",
                    top: "140%",
                    right: "0",
                    backgroundColor: "white",
                    zIndex: 1,
                    borderRadius: 1,
                    padding: 2,
                }}
            >
                <Box sx={{ padding: "10px" }}>
                    <Typography>{loginUser && loginUser?.nickname}님</Typography>
                    <Typography sx={{ fontSize: "14px", color: theme.palette.grey[500] }}>
                        {loginUser?.email}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                        내 자동차: <span style={{ fontWeight: 600 }}>테슬라</span>
                    </Typography>
                </Box>
            </Paper>
        );
    };

    const guest = [
        { nav: "정보마당", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "회원가입", link: "/join" },
        { nav: "로그인", link: "/login" },
    ];

    const user = [
        { nav: "정보마당", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "마이페이지", link: "/mypage" },
        { nav: "로그아웃", link: "/" },
    ];

    const admin = [
        { nav: "정보마당", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "회원관리", link: "/admin" },
        { nav: "로그아웃", link: "/" },
    ];

    const ELEVATION = location.pathname === "/" ? 0 : 4;

    const commonProps = {
        location,
        ActiveNav,
        setUserStatus,
        userStatus,
        StyledTypo,
        ELEVATION,
        MessageBox,
        dropdownOpen,
        setDropdownOpen,
        guest,
        user,
        admin,
    };

    return isMobile ? <DeskTopHeader {...commonProps} /> : <MobileHeader {...commonProps} />;
};

export default Header;
