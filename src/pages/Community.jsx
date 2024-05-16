import { useTheme } from "@emotion/react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useState } from "react";

const Community = () => {
    const [activeButton, setActiveButton] = useState("review");
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const Report = () => {
        const handleSubmit = () => {
            alert("완료!");
        };
        return (
            <>
                <Typography variant="h5" sx={{ margin: "30px" }}>
                    비매너 차량 신고
                </Typography>
                <form action="#" onSubmit={handleSubmit}>
                    {isDesktop ? (
                        <>
                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    marginRight: "60px",
                                }}
                            >
                                <FormControl
                                    sx={{ mb: 2, display: "flex", flexDirection: "row", alignItems: "center" }}
                                >
                                    <Typography sx={{ marginRight: 2 }}>차번호 :</Typography>
                                    <OutlinedInput sx={{ minWidth: "400px" }}></OutlinedInput>
                                </FormControl>
                                <FormControl
                                    sx={{ mb: 2, display: "flex", flexDirection: "row", alignItems: "center" }}
                                >
                                    <Typography sx={{ marginRight: 2 }}>충전소 :</Typography>
                                    <OutlinedInput sx={{ minWidth: "400px" }}></OutlinedInput>
                                </FormControl>
                                <FormControl
                                    sx={{ mb: 2, display: "flex", flexDirection: "row", alignItems: "center" }}
                                >
                                    <Typography sx={{ marginRight: 2, whiteSpace: "nowrap" }}>신고 내용 :</Typography>
                                    <TextField multiline rows={9} sx={{ minWidth: "400px" }}></TextField>
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ width: "300px", height: "40px", marginRight: "60px", marginBottom: "20px" }}
                                >
                                    신고
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <FormControl
                                    sx={{
                                        mb: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "left",
                                    }}
                                >
                                    <Typography sx={{ marginRight: 2, marginBottom: "10px" }}>차번호</Typography>
                                    <OutlinedInput sx={{ minWidth: "400px" }}></OutlinedInput>
                                </FormControl>
                                <FormControl
                                    sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "left" }}
                                >
                                    <Typography sx={{ marginRight: 2, marginBottom: "10px" }}>충전소</Typography>
                                    <OutlinedInput sx={{ minWidth: "400px" }}></OutlinedInput>
                                </FormControl>
                                <FormControl
                                    sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "left" }}
                                >
                                    <Typography sx={{ marginRight: 2, marginBottom: "10px", whiteSpace: "nowrap" }}>
                                        신고 내용
                                    </Typography>
                                    <TextField multiline rows={9} sx={{ minWidth: "400px" }}></TextField>
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ width: "200px", height: "40px", marginBottom: "20px" }}
                                >
                                    신고
                                </Button>
                            </Grid>
                        </>
                    )}
                </form>
            </>
        );
    };

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
                        setActiveButton("report");
                    }}
                >
                    신고하기
                </Button>
            </Box>
            {activeButton === "review" ? (
                // 여기 추가해주시면 됩니다!
                "리뷰"
            ) : (
                <>
                    <Report />
                </>
            )}
        </Grid>
    );
};

export default Community;
