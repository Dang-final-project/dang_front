import { Box, Grid, Typography } from "@mui/material";
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
                sx={{ width: "390px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
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
                            <Typography
                                sx={{ width: "100%", padding: "10px", marginBottom: "10px", marginLeft: "25%" }}
                            >
                                신고 내역이 없습니다.
                            </Typography>
                        )
                    ) : visibleReports.length > 0 ? (
                        visibleReports.map((report, index) => (
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
                        <Typography sx={{ width: "100%", padding: "10px", marginBottom: "10px", marginLeft: "25%" }}>
                            신고 내역이 없습니다.
                        </Typography>
                    )}
                    {isDesktop ? (
                        <PageCount
                            page={page}
                            count={Math.ceil(reports.length / reportsPerPage)}
                            handleChangePage={handleChangePage}
                        />
                    ) : (
                        <Box ref={target} sx={{ height: "10px", marginBottom: "30px" }}>
                            마지막 신고 내역입니다
                        </Box>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default MyReport;
