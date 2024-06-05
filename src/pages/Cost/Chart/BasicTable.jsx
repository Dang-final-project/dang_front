import { useState } from "react";
import {
    Grid,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import data from "./db.json";
import { Stack } from "@mui/system";

// 기관별 요금표
export const BasicTable = ({ chartWidth }) => {
    const [page, setPage] = useState(1);
    const [chargingData, setCharginData] = useState(data.features);

    function createData(No, 기관명, 구분, 요금) {
        return { No, 기관명, 구분, 요금 };
    }

    const rows = chargingData.map((data) =>
        createData(data.properties.순번, data.properties.기관명, data.properties.구분, data.properties.비회원가)
    );

    const theme = useTheme();
    const tableWidth = useMediaQuery(theme.breakpoints.up("md"));
    const rowsPerPage = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const currentData = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Grid
            sx={{
                width: tableWidth ? "40vw" : "90vw",
                height: tableWidth ? "50vh" : "40vh",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <TableContainer component={Paper} sx={{ marginBottom: "20px", height: "100%", minHeight: "350px" }}>
                <Table sx={{ height: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>기관명</TableCell>
                            <TableCell>구분</TableCell>
                            <TableCell>요금</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {chartWidth
                            ? currentData.map((row, index) => (
                                  <TableRow key={index}>
                                      <TableCell component="th" scope="row">
                                          {row.No}
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                          {row.기관명}
                                      </TableCell>
                                      <TableCell>{row.구분}</TableCell>
                                      <TableCell>{row.요금}</TableCell>
                                  </TableRow>
                              ))
                            : rows.map((row, index) => (
                                  <TableRow key={index}>
                                      <TableCell component="th" scope="row">
                                          {row.No}
                                      </TableCell>
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
            {chartWidth && (
                <Stack spacing={3}>
                    <Pagination
                        onChange={handleChangePage}
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            )}
        </Grid>
    );
};
