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
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userStatus, setUserStatus] = useState("user"); // guest, user, admin
    const isMobile = useMediaQuery("(max-width: 680px)");
    const location = useLocation();

    const theme = useTheme();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const StyledTypo = styled(Typography)({
        cursor: "pointer",
        margin: "10px",
        color: theme.palette.primary.main,
        "&:hover": {
            color: "#001067",
        },
    });

    const MessageBox = () => {
        return (
            <Paper
                elevation={3}
                sx={{
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                    bottom: "-360%",
                    left: "-300%",
                    backgroundColor: "white",
                    zIndex: 1,
                    mt: 1,
                    borderRadius: 1,
                    minWidth: "150px",
                }}
            >
                {/* 나중에 정보 받아와서 바꾸기 */}
                <Box sx={{ padding: "10px" }}>
                    <Typography>OO님</Typography>
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
        { nav: "회원가입", link: "/join" },
        { nav: "로그인", link: "/login" },
    ];

    const user = [
        { nav: "홈", link: "/" },
        { nav: "요금현황", link: "/cost" },
        { nav: "마이페이지", link: "/mypage" },
        { nav: "로그아웃", link: "/login" },
    ];

    const admin = [
        { nav: "홈", link: "/" },
        { nav: "요금현황", link: "/cost" },
        { nav: "회원관리", link: "/admin" },
        { nav: "로그아웃", link: "/login" },
    ];

    const ELEVATION = location.pathname === "/" ? 0 : 4;
    const DeskTopHeader = () => {
        return (
            <AppBar color="secondary" elevation={ELEVATION}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to="/">
                        <StyledTypo variant="h6">당충전</StyledTypo>
                    </Link>

                    {userStatus && userStatus === "guest" && (
                        <Grid sx={{ display: "flex" }}>
                            {guest.map((text, index) => (
                                <Link to={text.link}>
                                    <StyledTypo variant="h6">{text.nav}</StyledTypo>
                                </Link>
                            ))}
                        </Grid>
                    )}
                    {userStatus && userStatus === "user" && (
                        <Grid sx={{ display: "flex" }}>
                            <Grid>
                                <StyledTypo
                                    variant="h6"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    sx={{ position: "relative" }}
                                >
                                    님
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
                                    <StyledTypo variant="h6">{text.nav}</StyledTypo>
                                </Link>
                            ))}
                        </Grid>
                    )}
                    {userStatus && userStatus === "admin" && (
                        <Grid sx={{ display: "flex" }}>
                            {admin.map((text, index) => (
                                <Link to={text.link} key={text.nav}>
                                    <StyledTypo variant="h6">{text.nav}</StyledTypo>
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
                        <ListItemText primary={text.nav} />
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
            <AppBar color="secondary" elevation={ELEVATION}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MenuIcon
                        sx={{ fontSize: 30, backgroundColor: "#fff", borderRadius: "2px" }}
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
                        님
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

    return isMobile ? <MobileHeader /> : <DeskTopHeader />;
};

export default Header;
