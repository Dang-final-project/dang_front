import { Box, Grid, Typography } from "@mui/material";
import PageCount from "../utils/PageCount";
import { useState } from "react";

const MyReport = ({ reports }) => {
    const [page, setPage] = useState(1);

    const reportsPerPage = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const currentPage = reports.slice((page - 1) * reportsPerPage, page * reportsPerPage);

    return (
        <>
            <Grid
                sx={{ width: "450px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                    나의 신고
                </Typography>
                <Grid
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {reports.length > 0 ? (
                        currentPage.map((report, index) => (
                            <Box sx={{ marginBottom: 2, borderBottom: "1px solid lightgray" }} key={index}>
                                <Grid sx={{ display: "flex" }}>
                                    <Typography sx={{ marginRight: 3 }}>{report.carNum}</Typography>
                                    <Typography>{report.station}</Typography>
                                </Grid>
                                <Typography sx={{ fontSize: "20px", fontWeight: 600, marginTop: 1, marginBottom: 1 }}>
                                    {report.content}
                                </Typography>
                                <Typography>{new Date(report.createdAt).toLocaleString("ko-KR")}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography sx={{ padding: "10px", marginBottom: "10px", marginLeft: "32%" }}>
                            신고 내역이 없습니다.
                        </Typography>
                    )}
                    <PageCount
                        page={page}
                        count={Math.ceil(reports.length / reportsPerPage)}
                        handleChangePage={handleChangePage}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default MyReport;
