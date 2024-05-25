import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import Mypage from "./components/Mypage";
import ModifyInfo from './components/ModifyInfo';

const Community = () => {
    const [activeButton, setActiveButton] = useState("mycar");

    return (
        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ marginBottom: "10px" }}>
                <Button
                    variant="contained"
                    sx={{
                        width: "150px",
                        backgroundColor: activeButton === "mycar" ? "primary.main" : "primary.light",
                        marginRight: "10px",
                    }}
                    onClick={() => {
                        setActiveButton("mycar");
                    }}
                >
                    내 차량 정보
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        width: "150px",
                        backgroundColor: activeButton === "myinfo" ? "primary.main" : "primary.light",
                    }}
                    onClick={() => {
                        setActiveButton("myinfo");
                    }}
                >
                    개인정보
                </Button>
            </Box>
            {activeButton === "mycar" ? (
                //이 부분에 추가해주시면 됩니다!
                <Mypage />
            ) : (
                <ModifyInfo />
            )}
        </Grid>
    );
};

export default Community;
