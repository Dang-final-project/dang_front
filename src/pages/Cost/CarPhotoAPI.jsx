import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";

const imageStyle = {
    border: "1px solid #ccc",
    width: 300,
    height: 220,

};

export const CarPhotoAPI = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://api.unsplash.com/photos/random/", {
                    headers: {
                        Authorization: "Client-ID T3PZNjjzthxFni2o7W_aTfDpUC2zhpTYKdS7VULt2mY",
                    },
                    params: {
                        query: "car",
                        count: 18,
                    },
                });
                setImages(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error", err);
                setError("Failed to fetch image");
                setLoading(false);
            }
        };

        fetchRandomImage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://api.odcloud.kr/api/15039549/v1/uddi:aacd2890-94b3-4645-baba-da7f3561e83d_202004141517?page=1&perPage=20&serviceKey=4B1nW8qD9IBn0d7dknKCzNYFxKNer4bSpWUpGZ8VhpFr9XZ14V8xXcF9vAd0my6td3TGf47WXnmmtYH2V3JV3Q%3D%3D"
                );
                console.log("API Response", response.data);

                if (response.data && response.data.data) {
                    setData(response.data.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const boxStyle = {
        border: "1px solid #ccc",
        padding: "3vh",
        marginTop: -1,
        width: 300,
        height: 230,
        alignItems: "center",
    };
    return (
        <Grid container spacing={2}>
            {images.map((image, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx} >
                    <Box sx={{cursor: 'pointer'}}>
                    <img src={`${image.urls.raw}&w=300&fit=crop`} style={imageStyle} alt="car" />
                        <Box sx={boxStyle}>
                            <Typography variant="h6" component="strong">
                                모델명: {data[idx].모델명}
                            </Typography>
                            <Typography variant="body1">제조사: {data[idx].제조사}</Typography>
                            <Typography variant="body1">급속충전방식: {data[idx].급속충전방식}</Typography>
                            <Typography variant="body1">완속충전방식: {data[idx].완속충전방식}</Typography>
                            <Typography variant="body1">배터리용량: {data[idx].배터리용량}</Typography>
                            <Typography variant="body1">출시일: {data[idx].출시일}</Typography>
                        </Box> 
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default CarPhotoAPI;
