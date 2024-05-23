import { useTheme } from "@emotion/react";
import { Button, FormControl, Grid, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useCallback, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from './../../../hooks/useAuth';

const ReviewPost = () => {
    const { loginUser } = useAuth();
    const [title, setTitle] = useState("");
    const [station, setStation] = useState("");
    const [starScore, setStarScore] = useState("");
    const [content, setContent] = useState("");
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleSubmit = async (e) => {
        const UserId = loginUser?.id;
        e.preventDefault();
        try {
            if (UserId && title && station) {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/community/report`, {
                    title,
                    station,
                    starScore,
                    content,
                    UserId,
                    //작성 날짜
                });

                if (res.data.code === 200) {
                    Swal.fire({
                        title: `작성 완료하였습니다.`,
                        icon: "success",
                        confirmButtonText: "확인",
                        confirmButtonColor: theme.palette.primary.main,
                    });
                    setTitle("");
                    setStation("");
                    setStarScore("");
                    setContent("");
                }
            } else {
                Swal.fire({
                    title: `이용후기를 작성해 주세요`,
                    icon: "warning",
                    confirmButtonText: "확인",
                    confirmButtonColor: theme.palette.error.main,
                });

            }
        } catch (err) {
            console.error(err);
        }
    };

    const writeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const writeStation = useCallback((e) => {
        setStation(e.target.value);
    }, []);

    const writestarScore = useCallback((e) => {
        setStarScore(e.target.value);
    }, []);

    const writeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    return (
        <>
            <Typography variant="h5" sx={{ margin: "30px" }}>
                이용 충전소 후기
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
                        <Typography sx={{ marginRight: 2 }}>제목 {isDesktop && ":"}</Typography>
                        <OutlinedInput
                            name="title"
                            value={title}
                            onChange={writeTitle}
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
                            onChange={writeStation}
                            sx={{ minWidth: "400px" }}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            mb: 2,
                            display: "flex",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: isDesktop ? "center" : "flex-start",
                        }}
                    >
                        <Typography sx={{ marginRight: 7, whiteSpace: "nowrap" }}>
                            별 점 {isDesktop && ":"}
                        </Typography>
                        <Rating
                            name="starscore"
                            value={starScore}
                            onChange={writestarScore}
                            size="large"
                        />
                        <TextField
                            name="starscore"
                            value={starScore}
                            onChange={(e) => setStarScore(e.target.value)}
                            //onChange={writestarScore}
                            sx={{ visibility: "hidden"}}
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
                            후기 내용 {isDesktop && ":"}
                        </Typography>
                        <TextField
                            name="content"
                            value={content}
                            onChange={writeContent}
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
                        작성하기
                    </Button>
                </Grid>
            </form>
        </>
    );
};


export default ReviewPost;

