import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, Grid, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const Report = ({ onSubmit }) => {
    const { loginUser } = useAuth();
    const [carNum, setCarNum] = useState("");
    const [station, setStation] = useState("");
    const [content, setContent] = useState("");
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (carNum && station && content) {
                await onSubmit({ carNum, station, content, UserId: loginUser?.id });
                setCarNum("");
                setStation("");
                setContent("");
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
                    <Typography sx={{ marginRight: 2, whiteSpace: "nowrap" }}>신고 내용 {isDesktop && ":"}</Typography>
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
    );
};

const Report = ({ onSubmit }) => {
    return (
        <>
            <Typography variant="h5" sx={{ margin: "30px" }}>
                비매너 차량 신고
            </Typography>
            <ReportForm onSubmit={onSubmit} />
        </>
    );
};

export default Report;

// In your Community component, you will render the Report component passing the onSubmit function as a prop.