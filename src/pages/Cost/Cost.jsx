import {
    Box,
    Button,
    Grid,
    useTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Pagination,
    useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
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
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

const brandData = [
    "KEVIT",
    "LG헬로비전",
    "대영채비",
    "삼성EVC",
    "에버온",
    "에스트래픽",
    "이카플러그",
    "제주전기자동차서비스",
    "지커넥트",
    "차지비",
    "타디스크테크놀로지",
    "파워큐브코리아",
    "한국전기차충전서비스",
    "한국전력",
    "환경부",
];
const costData = [212.9, 240, 270, 248.3, 266.4, 204.5, 278.2, 270, 178.9, 245.5, 261.8, 186.1, 279.8, 256.4, 304];

export const LineChart = () => {
    const theme = useTheme();
    const chartWidth = useMediaQuery(theme.breakpoints.up("md"));

    const data = {
        labels: brandData,
        datasets: [
            {
                label: "브랜드별 요금 현황",
                data: costData,
                fill: false,
                backgroundColor: theme.palette.primary.main,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <Box sx={{ width: chartWidth ? "600px" : "400px", height: chartWidth ? "300px" : "100%" }}>
            <Bar data={data} options={options} sx={{ width: "100%" }} />
        </Box>
    );
};

function createData(기관명, 구분, 요금) {
    return { 기관명, 구분, 요금 };
}

const rows = [
    createData("환경부", "급속", 347.2),
    createData("환경부", "완속", 324.4),
    createData("GS차지비", "급속", 470),
    createData("GS차지비", "완속", 470),
    createData("GS칼텍스", "급속", 430),
    createData("LG유플러스", "급속", 350),
    createData("LG유플러스", "완속", 350),
];

export const BasicTable = () => {
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const tableWidth = useMediaQuery(theme.breakpoints.up("md"));
    const rowsPerPage = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const currentData = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Grid sx={{ marginBottom: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
                <Table sx={{ minWidth: tableWidth ? "650px" : "400px" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>기관명</TableCell>
                            <TableCell>구분</TableCell>
                            <TableCell>요금</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.기관명}
                                </TableCell>
                                <TableCell>{row.구분}</TableCell>
                                <TableCell>{row.요금}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={3}>
                <Pagination
                    onChange={handleChangePage}
                    count={Math.ceil(rows.length / rowsPerPage)}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </Grid>
    );
};

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
                "전기차"
            ) : (
                <>
                    <LineChart />
                    <BasicTable />
                </>
            )}
        </Grid>
    );
};

export default Cost;
