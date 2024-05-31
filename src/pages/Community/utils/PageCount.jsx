import React from "react";
import { Grid, Pagination, Stack } from "@mui/material";

const PageCount = ({ page, count, handleChangePage }) => {
    console.log(page, count);
    return (
        <Grid sx={{ marginBottom: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Stack spacing={3}>
                <Pagination
                    onChange={(e) => handleChangePage(e)}
                    count={count}
                    page={parseInt(page)}
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </Grid>
    );
};

export default PageCount;
