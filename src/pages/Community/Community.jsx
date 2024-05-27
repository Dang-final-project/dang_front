import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import Report from "./Report/Report";
import Review from "./Review/Review";

const Community = () => {
    const [activeButton, setActiveButton] = useState("review");

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
                    후기
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
                //이 부분에 추가해주시면 됩니다!
                <Review />
            ) : (
                <Report />
            )}
        </Grid>
    );
};

export default Community;
