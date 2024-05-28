import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

const PageHeader = ({ title, desc }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));

    return isMobile ? (
        <Grid sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Grid>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}>
                    {title}
                </Typography>
                <Typography sx={{ width: "75%", whiteSpace: "pre-wrap" }}>{desc}</Typography>
            </Grid>

            <Box component="img" src="/car.png" alt="car" />
        </Grid>
    ) : (
        <Grid sx={{ marginBottom: "20px", textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}>
                {title}
            </Typography>
            <Typography>{desc}</Typography>
        </Grid>
    );
};

export default PageHeader;
