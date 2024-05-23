import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import Chart from "./Chart/Chart";

const Cost = () => {
    const [activeButton, setActiveButton] = useState("electricCar");

    return (
        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ marginBottom: "10px" }}>
                <Button
                    variant="contained"
                    sx={{
                        width: "150px",
                        backgroundColor: activeButton === "electricCar" ? "primary.main" : "primary.light",
                        marginRight: "10px",
                    }}
                    onClick={() => {
                        setActiveButton("electricCar");
                    }}
                >
                    전기차 종류
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        width: "150px",
                        backgroundColor: activeButton === "costTable" ? "primary.main" : "primary.light",
                    }}
                    onClick={() => {
                        setActiveButton("costTable");
                    }}
                >
                    요금표
                </Button>
            </Box>
            {activeButton === "electricCar" ? (
                <CarType />
            ) : (
                <>
                    <Chart />
                </>
            )}
        </Grid>
    );
};

export default Cost;
