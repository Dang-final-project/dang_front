import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { LineChart } from "./LineChart";
import { BasicTable } from "./BasicTable";
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

const Chart = () => {
    const theme = useTheme();
    const chartWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Grid
            sx={{
                display: "flex",
                flexDirection: chartWidth ? "row" : "column",
                maxWidth: "1700px",
                minHeight: chartWidth ? "500px" : "800px",
                marginTop: "50px",
            }}
        >
            <LineChart theme={theme} chartWidth={chartWidth} />
            <BasicTable chartWidth={chartWidth} />
        </Grid>
    );
};

export default Chart;
