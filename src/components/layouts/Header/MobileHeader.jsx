import { AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";

// 모바일 헤더
export const MobileHeader = ({
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
}) => {
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const [open, setOpen] = useState(false);
    const { loginUser, logout } = useAuth();
    // 모바일 헤더 아이템들
    const DrawerItem = (text) => {
        return (
            <ListItem key={text.nav} disablePadding>
                <Link to={text.link}>
                    <ListItemButton>
                        {text.nav !== "로그아웃" && location.pathname === text.link ? (
                            <ActiveNav
                                onClick={() => {
                                    text.nav === "로그아웃" &&
                                        logout(() => {
                                            setUserStatus("guest");
                                        });
                                }}
                            >
                                {text.nav}
                            </ActiveNav>
                        ) : (
                            <ListItemText
                                onClick={() => {
                                    text.nav === "로그아웃" &&
                                        logout(() => {
                                            setUserStatus("guest");
                                        });
                                }}
                                primary={text.nav}
                            />
                        )}
                    </ListItemButton>
                </Link>
            </ListItem>
        );
    };

    // 모바일 헤더 리스트들
    const DrawerList = (
        <Box sx={{ width: "250px" }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <Link to="/">
                        <ListItemButton sx={{ width: "88px" }}>
                            {location.pathname === "/" ? (
                                <ActiveNav
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                >
                                    홈
                                </ActiveNav>
                            ) : (
                                <ListItemText
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                    primary="홈"
                                />
                            )}
                        </ListItemButton>
                    </Link>
                </ListItem>
                {userStatus && userStatus === "guest" && guest.map((text, index) => DrawerItem(text))}
                {userStatus && userStatus === "user" && user.map((text, index) => DrawerItem(text))}
                {userStatus && userStatus === "admin" && admin.map((text, index) => DrawerItem(text))}
            </List>
        </Box>
    );

    return (
        <AppBar color="secondary" elevation={ELEVATION} sx={{ minHeight: "64px" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <MenuIcon sx={{ fontSize: "32px", borderRadius: "2px" }} onClick={toggleDrawer(true)} />
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                {loginUser?.id && (
                    <>
                        <StyledTypo
                            variant="h6"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            sx={{ position: "relative" }}
                        >
                            {loginUser && loginUser?.nickname}님
                            {dropdownOpen ? (
                                <ArrowDropUpIcon sx={{ fontSize: "22px" }} />
                            ) : (
                                <ArrowDropDownIcon sx={{ fontSize: "22px" }} />
                            )}
                            {dropdownOpen && <MessageBox />}
                        </StyledTypo>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};
