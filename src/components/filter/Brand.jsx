import { Chip, Grid } from "@mui/material";

const Brand = ({ brands, setSelectedBrand, selectedBrand }) => {
    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);  
    };

    return (
        <Grid container spacing={2}>
            {brands.map((brand, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <Chip
                        variant={selectedBrand === brand ? 'contained' : 'outlined'}
                        color="primary"
                        label={brand}
                        onClick={() => handleBrandClick(brand)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default Brand;
