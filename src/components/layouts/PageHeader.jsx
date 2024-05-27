import { Grid, Typography } from "@mui/material";

const PageHeader = ({ children }) => {
    return (
        <Grid>
            <Typography variant="h4" sx={{ marginBottom: "30px", fontWeight: "bold" }}>
                {children}
            </Typography>
        </Grid>
    );
};

export default PageHeader;
