import { Button, FormControl, Grid, OutlinedInput, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { communityApi } from "../../../api/services/community";

const ReportDriver = ({ isDesktop, theme, getReports, loginUser, kakaoId }) => {
    const [carNum, setCarNum] = useState("");
    const [station, setStation] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        const UserId = loginUser?.id || kakaoId;
        e.preventDefault();
        try {
            if (carNum && station && content) {
                const res = await communityApi.postReport({ carNum, station, content, UserId });

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
                    getReports();
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
        <>
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
                            marginRight: isDesktop ? "30px" : "0",
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
                                sx={{ minWidth: "350px" }}
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
                                sx={{ minWidth: "350px" }}
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
                                sx={{ minWidth: "350px" }}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: isDesktop ? "280px" : "200px",
                                height: "40px",
                                marginRight: isDesktop ? "45px" : "0",
                                marginBottom: "20px",
                            }}
                        >
                            신고
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </>
    );
};

export default ReportDriver;
