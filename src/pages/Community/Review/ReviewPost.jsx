import { useTheme } from "@emotion/react";
import { Button, FormControl, Grid, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useCallback, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from './../../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import SearchPopup from "./SearchPopup";

const ReviewPost = ({ open, handleClose }) => {
    const { loginUser } = useAuth();
    const [station, setStation] = useState("");
    const [starScore, setStarScore] = useState(0);
    const [content, setContent] = useState("");
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const UserId = loginUser?.id;
        e.preventDefault();
        try {
            if (UserId && station) {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/community/review`, {
                    station,
                    starScore,
                    content,
                    UserId,
                });

                if (res.data.code === 200) {
                    Swal.fire({
                        title: `작성 완료하였습니다.`,
                        icon: "success",
                        confirmButtonText: "확인",
                        confirmButtonColor: theme.palette.primary.main,
                    }).then(() => navigate("/community"));
                    setStation("");
                    setStarScore(0);
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

    const writeStation = useCallback((e) => {
        setStation(e.target.value);
    }, []);

    const writestarScore = useCallback((event, newValue) => {
        setStarScore(newValue);
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
                        <Typography sx={{ marginRight: 2 }}>충전소 {isDesktop && ":"}</Typography>
                        <SearchPopup open={open} handleClose={handleClose} />
                        {/* <OutlinedInput
                            name="station"
                            value={station}
                            onChange={writeStation}
                            sx={{ minWidth: "400px" }}
                            onClick={handleTextInputClick}
                        /> */}
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