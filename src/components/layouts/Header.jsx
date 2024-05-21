import {
    Box,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    styled,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import "../../App.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useAuth } from "../../hooks/useAuth";
import { Cookies } from "react-cookie";

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation();
    const { loginUser, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userStatus, setUserStatus] = useState("guest"); // guest, user, admin

    useEffect(() => {
        if (loginUser?.id) {
            setUserStatus("user");
        } else {
            setUserStatus("guest");
        }
    }, [loginUser]);

    const cookies = new Cookies();
    const kakaoLogin = cookies.get("userId");

    useEffect(() => {
        if (kakaoLogin) {
            setUserStatus("user");
        } else {
            setUserStatus("guest");
        }
    }, [kakaoLogin]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const StyledTypo = styled(Typography)({
        cursor: "pointer",
        margin: "10px",
        color: "#4b4037",
        "&:hover": {
            color: theme.palette.primary.main,
        },
    });

    const MessageBox = () => {
        return (
            <Paper
                elevation={3}
                sx={{
                    width: "200px",
                    height: "150px",
                    position: "absolute",
                    top: "140%",
                    right: "0",
                    backgroundColor: "white",
                    zIndex: 1,
                    borderRadius: 1,
                    // minWidth: "150px",
                }}
            >
                <Box sx={{ padding: "10px" }}>
                    <Typography>{loginUser?.nickname + "님"}</Typography>
                    <Typography sx={{ fontSize: "14px", color: theme.palette.grey[500] }}>test@gmail.com</Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                        내 자동차: <span style={{ fontWeight: 600 }}>테슬라</span>
                    </Typography>
                </Box>
            </Paper>
        );
    };

    const guest = [
        { nav: "홈", link: "/" },
        { nav: "요금현황", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "회원가입", link: "/join" },
        { nav: "로그인", link: "/login" },
    ];

    const user = [
        { nav: "홈", link: "/" },
        { nav: "요금현황", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "마이페이지", link: "/mypage" },
        { nav: "로그아웃", link: "/" },
    ];

    const admin = [
        { nav: "홈", link: "/" },
        { nav: "요금현황", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "회원관리", link: "/admin" },
        { nav: "로그아웃", link: "/" },

    ];

    const ELEVATION = location.pathname === "/" ? 0 : 4;
    const DeskTopHeader = () => {
        return (
            <AppBar color="secondary" elevation={ELEVATION}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                    <StyledTypo
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        당충전
                    </StyledTypo>


                    {userStatus && userStatus === "guest" && (
                        <Grid sx={{ display: "flex" }}>
                            {guest.map((text, index) => (
                                <Link to={text.link} key={index}>
                                    <StyledTypo key={index}>{text.nav}</StyledTypo>
                                </Link>
                            ))}
                        </Grid>
                    )}
                    {userStatus && userStatus === "user" && (
                        <Grid sx={{ display: "flex" }}>
                            <Grid>
                                <StyledTypo
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    sx={{ position: "relative" }}
                                >
                                    {loginUser?.nickname + "님"}
                                    {dropdownOpen ? (
                                        <ArrowDropUpIcon sx={{ fontSize: "22px" }} />
                                    ) : (
                                        <ArrowDropDownIcon sx={{ fontSize: "22px" }} />
                                    )}
                                    {dropdownOpen && <MessageBox />}
                                </StyledTypo>
                            </Grid>
                            {user.map((text, index) => (
                                <Link to={text.link}>
                                    <StyledTypo
                                        onClick={() => {
                                            text.nav === "로그아웃" &&
                                                logout(() => {
                                                    setUserStatus("guest");
                                                });
                                        }}
                                    >
                                        {text.nav}
                                    </StyledTypo>
                                </Link>
                            ))}
                        </Grid>
                    )}
                    {userStatus && userStatus === "admin" && (
                        <Grid sx={{ display: "flex" }}>
                            {admin.map((text, index) => (
                                <Link to={text.link} key={text.nav}>
                                    <StyledTypo>{text.nav}</StyledTypo>
                                </Link>
                            ))}
                        </Grid>
                    )}
                </Toolbar>
            </AppBar>
        );
    };

    const DrawerItem = (text) => {
        return (
            <ListItem key={text.nav} disablePadding>
                <Link to={text.link}>
                    <ListItemButton>
                        <ListItemText
                            onClick={() => {
                                text.nav === "로그아웃" &&
                                    logout(() => {
                                        setUserStatus("guest");
                                    });
                            }}
                            primary={text.nav}
                        />
                    </ListItemButton>
                </Link>
            </ListItem>
        );
    };

    const DrawerList = (
        <Box sx={{ width: "250px" }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {userStatus && userStatus === "guest" && guest.map((text, index) => DrawerItem(text))}
                {userStatus && userStatus === "user" && user.map((text, index) => DrawerItem(text))}
                {userStatus && userStatus === "admin" && admin.map((text, index) => DrawerItem(text))}
            </List>
        </Box>
    );

    const MobileHeader = () => {
        return (
            <AppBar color="secondary" elevation={ELEVATION} sx={{ minHeight: "64px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MenuIcon
                        sx={{ fontSize: "30px", backgroundColor: "#fff", borderRadius: "2px" }}
                        onClick={toggleDrawer(true)}
                    />
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                    <StyledTypo
                        variant="h6"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        sx={{ position: "relative" }}
                    >
                        {loginUser && loginUser?.nickname + "님"}
                        {dropdownOpen ? (
                            <ArrowDropUpIcon sx={{ fontSize: "22px" }} />
                        ) : (
                            <ArrowDropDownIcon sx={{ fontSize: "22px" }} />
                        )}
                        {dropdownOpen && <MessageBox />}
                    </StyledTypo>
                </Toolbar>
            </AppBar>
        );
    };

    return isMobile ? <DeskTopHeader /> : <MobileHeader />;
};

export default Header;
