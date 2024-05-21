import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, Grid, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import Report from './Report/Report';
import Review from './Review/Review'

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
                <Review />
            ) : (
                <Report />
            )}
        </Grid>
    );
};

export default Community;
