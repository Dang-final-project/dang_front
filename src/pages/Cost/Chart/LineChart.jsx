import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";

// 브랜드별 요금 현황 차트
export const LineChart = ({ theme, chartWidth }) => {
    const brandData = [
        "KEVIT",
        "LG헬로비전",
        "대영채비",
        "삼성EVC",
        "에버온",
        "에스트래픽",
        "이카플러그",
        "제주전기자동차서비스",
        "차지비",
        "타디스크테크놀로지",
        "한국전기차충전서비스",
        "한국전력",
        "환경부",
    ];
    const costData = [380, 430, 440, 400, 345, 292.9, 391, 453.3, 380, 424, 430, 385.5, 355.7];

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
        <Box
            sx={{
                width: chartWidth ? "50vw" : "90vw",
                height: chartWidth ? "60vh" : "40vh",
                minHeight: "300px",
                marginRight: chartWidth ? 5 : 0,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Bar data={data} options={options} sx={{ width: "100%", height: "100%" }} />
        </Box>
    );
};
