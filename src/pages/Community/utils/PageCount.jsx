import React from "react";
import { Grid, Pagination, Stack } from "@mui/material";

const PageCount = ({ page, count, handleChangePage }) => {
    return (
        <Grid sx={{ marginBottom: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Stack spacing={3}>
                <Pagination
                    onChange={(e, newPage) => handleChangePage(e, newPage)}
                    count={count}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </Grid>
    );
};

export default PageCount;
