import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Report from "./Report/Report";
import Review from "./Review/Review";
import PageHeader from "../../components/layouts/PageHeader";
import { useTheme } from "@emotion/react";

const Community = () => {
    const [activeButton, setActiveButton] = useState("review");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <PageHeader
                title="커뮤니티"
                desc="다른 유저들과 충전소 후기를 공유하고 비매너 차량을 신고할 수 있습니다."
            />
            <Box sx={{ marginBottom: "10px", display: "flex", width: "100%", marginBottom: "50px" }}>
                <Button
                    variant="contained"
                    sx={{
                        width: "50%",
                        height: "46px",
                        backgroundColor: activeButton === "review" ? "primary.main" : "grey.100",
                        color: activeButton === "review" ? "white" : "grey.500",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                    onClick={() => {
                        setActiveButton("review");
                    }}
                >
                    후기
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        width: "50%",
                        height: "46px",
                        backgroundColor: activeButton === "report" ? "primary.main" : "grey.100",
                        color: activeButton === "report" ? "white" : "grey.500",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                    onClick={() => {
                        setActiveButton("report");
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
