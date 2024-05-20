import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, Grid, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

const Report = () => {
    const { loginUser } = useAuth();
    const [carNum, setCarNum] = useState("");
    const [station, setStation] = useState("");
    const [content, setContent] = useState("");
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleSubmit = async (e) => {
        const UserId = loginUser?.id;
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/community/report`, {
                carNum,
                station,
                content,
                UserId,
            });
            if (res.data.code === 200) {
                Swal.fire({
                    title: `신고 되었습니다`,
                    icon: "success",
                    confirmButtonText: "확인",
                    confirmButtonColor: theme.palette.primary.main,
                });
                setCarNum("");
                setStation("");
                setContent("");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCarNumChange = useCallback((e) => {
        setCarNum(e.target.value);
    }, []);

    const handleStationChange = useCallback((e) => {
        setStation(e.target.value);
    }, []);

    const handleContentChange = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    return (
        <>
            <Typography variant="h5" sx={{ margin: "30px" }}>
                비매너 차량 신고
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: isDesktop ? "column" : "column",
                        alignItems: isDesktop ? "flex-end" : "center",
                        marginRight: isDesktop ? "60px" : "0",
                    }}
                >
                    <FormControl
                        sx={{
                            mb: 2,
                            display: "flex",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: isDesktop ? "center" : "left",
                        }}
                    >
                        <Typography sx={{ marginRight: 2 }}>차번호 {isDesktop && ":"}</Typography>
                        <OutlinedInput
                            name="carNum"
                            value={carNum}
                            onChange={handleCarNumChange}
                            sx={{ minWidth: "400px" }}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            mb: 2,
                            display: "flex",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: isDesktop ? "center" : "left",
                        }}
                    >
                        <Typography sx={{ marginRight: 2 }}>충전소 {isDesktop && ":"}</Typography>
                        <OutlinedInput
                            name="station"
                            value={station}
                            onChange={handleStationChange}
                            sx={{ minWidth: "400px" }}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            mb: 2,
                            display: "flex",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: isDesktop ? "center" : "left",
                        }}
                    >
                        <Typography sx={{ marginRight: 2, whiteSpace: "nowrap" }}>
                            신고 내용 {isDesktop && ":"}
                        </Typography>
                        <TextField
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            multiline
                            rows={9}
                            sx={{ minWidth: "400px" }}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: isDesktop ? "300px" : "200px",
                            height: "40px",
                            marginRight: isDesktop ? "60px" : "0",
                            marginBottom: "20px",
                        }}
                    >
                        신고
                    </Button>
                </Grid>
            </form>
        </>
    );
};

const Community = () => {
    const [activeButton, setActiveButton] = useState("review");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { loginUser } = useAuth();

    useEffect(() => {
        loginUser?.id ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, [loginUser]);

    return (
        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ marginBottom: "10px" }}>
                <Button
                    variant="contained"
                    sx={{
                        width: "150px",
                        backgroundColor: activeButton === "review" ? "primary.main" : "primary.light",
                        marginRight: "10px",
                    }}
                    onClick={() => {
                        setActiveButton("review");
                    }}
                >
                    후기 작성 게시판
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        width: "150px",
                        backgroundColor: activeButton === "report" ? "primary.main" : "primary.light",
                    }}
                    onClick={() => {
                        isLoggedIn ? setActiveButton("report") : window.location.replace("/login");
                    }}
                >
                    신고하기
                </Button>
            </Box>
            {activeButton === "review" ? (
                //이 부분에 추가해주시면 됩니다!
                "리뷰"
            ) : (
                <Report />
            )}
        </Grid>
    );
};

export default Community;
