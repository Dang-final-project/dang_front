import { Box, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useAuth } from "../../../hooks/useAuth";

// 데스크탑 헤더
export const DeskTopHeader = ({
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
    const { loginUser, logout } = useAuth();

    return (
        <AppBar color="secondary" elevation={ELEVATION}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                    sx={{ display: "flex", cursor: "pointer" }}
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    <Box component="img" src="/danglogo.svg" alt="logo" sx={{ width: "90px", height: "auto" }} />
                </Box>

                {/* 로그인 하지 않은 경우 */}
                {userStatus && userStatus === "guest" && (
                    <Grid sx={{ display: "flex" }}>
                        {guest.map((text, index) => (
                            <Link to={text.link} key={index}>
                                {location.pathname === text.link ? (
                                    <ActiveNav>{text.nav}</ActiveNav>
                                ) : (
                                    <StyledTypo>{text.nav}</StyledTypo>
                                )}
                            </Link>
                        ))}
                    </Grid>
                )}
                {/* 일반 유저 로그인 한 경우 */}
                {userStatus && userStatus === "user" && (
                    <Grid sx={{ display: "flex", alignItems: "center" }}>
                        <Grid>
                            <StyledTypo
                                onClick={(e) => {
                                    setDropdownOpen(!dropdownOpen);
                                }}
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
                        </Grid>
                        {user.map((text, index) => (
                            <Link to={text.link} key={index}>
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
                                    <>
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
                                    </>
                                )}
                            </Link>
                        ))}
                    </Grid>
                )}

                {/* 관리자일 경우 */}
                {userStatus && userStatus === "admin" && (
                    <Grid sx={{ display: "flex" }}>
                        {admin.map((text, index) => (
                            <Link to={text.link} key={index}>
                                {text.nav !== "로그아웃" && location.pathname === text.link ? (
                                    <ActiveNav>{text.nav}</ActiveNav>
                                ) : (
                                    <StyledTypo>{text.nav}</StyledTypo>
                                )}
                            </Link>
                        ))}
                    </Grid>
                )}
            </Toolbar>
        </AppBar>
    );
};
