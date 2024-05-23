import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, Grid, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "./../../../hooks/useAuth";
import { Cookies } from "react-cookie";
import PageCount from "../utils/PageCount";

const Report = () => {
    const { loginUser } = useAuth();
    const cookies = new Cookies();
    const kakaoId = cookies.get("userId");
    const kakaoToken = cookies.get("accessToken");
    const [carNum, setCarNum] = useState("");
    const [station, setStation] = useState("");
    const [content, setContent] = useState("");
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [reports, setReports] = useState([]);

    const [page, setPage] = useState(1);

    const reportsPerPage = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const currentPage = reports.slice((page - 1) * reportsPerPage, page * reportsPerPage);

    useEffect(() => {
        getReports();
    }, []);

    const getReports = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/community/report`, {
                headers: {
                    Authorization: loginUser?.token || kakaoToken,
                },
                params: {
                    userId: loginUser?.id || kakaoId,
                },
            });
            if (res.data.code === 200) {
                setReports(res.data.payload);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        const UserId = loginUser?.id || kakaoId;
        e.preventDefault();
        try {
            if (carNum && station && content) {
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
            } else {
                Swal.fire({
                    title: `내용을 입력해주세요`,
                    icon: "warning",
                    confirmButtonText: "확인",
                    confirmButtonColor: theme.palette.error.main,
                });
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
        <Grid sx={{ display: "flex", flexDirection: isDesktop ? "row" : "column", marginTop: "50px" }}>
            <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
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
                                rows={13}
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
            </Grid>
            <Grid
                sx={{ width: "450px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                    나의 신고
                </Typography>
                <Grid
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {reports.length > 0 ? (
                        currentPage.map((report, index) => (
                            <Box sx={{ marginBottom: 2, borderBottom: "1px solid lightgray" }} key={index}>
                                <Grid sx={{ display: "flex" }}>
                                    <Typography sx={{ marginRight: 3 }}>{report.carNum}</Typography>
                                    <Typography>{report.station}</Typography>
                                </Grid>
                                <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>{report.content}</Typography>
                                <Typography>
                                    {Date(report.createdAt)
                                        .toLocaleString()
                                        .slice(0, 25)}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography sx={{ padding: "10px", marginBottom: "10px", marginLeft: "32%" }}>
                            신고 내역이 없습니다.
                        </Typography>
                    )}
                    <PageCount
                        page={page}
                        count={Math.ceil(reports.length / reportsPerPage)}
                        handleChangePage={handleChangePage}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Report;
