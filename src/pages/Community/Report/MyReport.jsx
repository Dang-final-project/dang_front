import { Box, Grid, Paper, Typography } from "@mui/material";
import PageCount from "../utils/PageCount";
import { useEffect, useRef, useState } from "react";

const MyReport = ({ reports, isDesktop }) => {
    const [page, setPage] = useState(1);
    const [visibleReports, setVisibleReports] = useState([]);
    const observer = useRef();
    const target = useRef();
    const reportsPerPage = 5;

    useEffect(() => {
        if (isDesktop) {
            const startIndex = (page - 1) * reportsPerPage;
            const endIndex = startIndex + reportsPerPage;
            setVisibleReports(reports.slice(startIndex, endIndex));
        } else {
            setVisibleReports(reports.slice(0, reportsPerPage));
        }
    }, [reports, page, isDesktop]);

    const loadMoreReports = () => {
        const startIndex = visibleReports.length;
        const endIndex = startIndex + reportsPerPage;
        const newReports = reports.slice(startIndex, endIndex);
        setVisibleReports((prevReports) => [...prevReports, ...newReports]);
    };

    const handleObserver = (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            loadMoreReports();
        }
    };

    useEffect(() => {
        if (!isDesktop) {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(handleObserver);
            if (observer.current) {
                observer.current.observe(target.current);
            }
        }
        return () => observer.current && observer.current.disconnect();
    }, [visibleReports, isDesktop]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <Grid
                sx={{
                    width: isDesktop ? "55%" : "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: isDesktop ? 0 : "30px",
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                    나의 신고
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <Paper elevation="6" sx={{ padding: 6, height: isDesktop ? "660px" : "100%" }}>
                        {isDesktop ? (
                            reports.length > 0 ? (
                                visibleReports.map((report, index) => (
                                    <Box sx={{ marginBottom: 2, borderBottom: "1px solid lightgray" }} key={index}>
                                        <Grid sx={{ display: "flex" }}>
                                            <Typography sx={{ marginRight: 3 }}>{report.carNum}</Typography>
                                            <Typography>{report.station}</Typography>
                                        </Grid>
                                        <Typography
                                            sx={{ fontSize: "20px", fontWeight: 600, marginTop: 1, marginBottom: 1 }}
                                        >
                                            {report.content}
                                        </Typography>
                                        <Typography>{new Date(report.createdAt).toLocaleString("ko-KR")}</Typography>
                                    </Box>
                                ))
                            ) : (
                                <Grid
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Box component="img" src="/noreport.png" sx={{ width: "150px", mb: 2 }} />
                                    <Typography sx={{ fontSize: "24px" }}>신고 내역이 없습니다.</Typography>
                                </Grid>
                            )
                        ) : visibleReports.length > 0 ? (
                            visibleReports.map((report, index) => (
                                <Box sx={{ marginBottom: 2, borderBottom: "1px solid lightgray" }} key={index}>
                                    <Grid sx={{ display: "flex" }}>
                                        <Typography sx={{ marginRight: 3 }}>{report.carNum}</Typography>
                                        <Typography>{report.station}</Typography>
                                    </Grid>
                                    <Typography
                                        sx={{ fontSize: "20px", fontWeight: 600, marginTop: 1, marginBottom: 1 }}
                                    >
                                        {report.content}
                                    </Typography>
                                    <Typography>{new Date(report.createdAt).toLocaleString("ko-KR")}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Box component="img" src="/noreport.png" sx={{ width: "150px", mb: 2 }} />
                                <Typography sx={{ marginBottom: "10px", fontSize: "24px" }}>
                                    신고 내역이 없습니다.
                                </Typography>
                            </Grid>
                        )}

                        {isDesktop ? (
                            <PageCount
                                page={page}
                                count={Math.ceil(reports.length / reportsPerPage)}
                                handleChangePage={handleChangePage}
                            />
                        ) : (
                            <Box ref={target} sx={{ height: "10px" }}></Box>
                        )}
                    </Paper>
                </Box>
            </Grid>
        </>
    );
};

export default MyReport;
