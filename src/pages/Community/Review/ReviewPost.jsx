import { useTheme } from "@emotion/react";
import { Button, FormControl, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
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
            if (station) {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/community/review`, {
                    station,
                    starScore,
                    content
                }, {
                    headers: {
                        Authorization: loginUser.token
                    }
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
                } else{
                    Swal.fire({
                        title: `이용후기를 작성해 주세요`,
                        icon: "warning",
                        confirmButtonText: "확인",
                        confirmButtonColor: theme.palette.error.main,
                    });
                }
            } 
        } catch (err) {
            console.error(err);
        }
    };
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
                    container
                    direction="column"
                    justifyContent="flex-start" // 왼쪽 정렬 설정
                    // alignItems="center"
                    sx={{ margin: "0 auto", width: "90%"}}
                >
                    <FormControl sx={{ mb: 2 }}>
                        <Typography>충전소:</Typography>
                        <SearchPopup open={open} handleClose={handleClose} station={station} setStation={setStation} />
                    </FormControl>
                    <FormControl sx={{ mb: 2 }}>
                        <Typography>별 점:</Typography>
                        <Rating
                            name="starscore"
                            value={starScore}
                            onChange={writestarScore}
                            size="large"
                        />
                    </FormControl>
                    <FormControl sx={{ mb: 2 }}>
                        <Typography>후기 내용:</Typography>
                        <TextField
                            name="content"
                            value={content}
                            onChange={writeContent}
                            multiline
                            rows={9}
                            fullWidth
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ width: "100%", mt: 2 }}
                    >
                        작성하기
                    </Button>
                </Grid>
            </form>
        </>
    );
};

export default ReviewPost;
