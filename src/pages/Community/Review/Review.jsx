import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import PageCount from "../utils/PageCount";
import StationSearch from "./StationSearch";

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const reviewsPerPage = 3;
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const getReviews = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/community/review`, {
                headers: {
                    Authorization: loginUser.token,
                },
            });
            if (res.data.code === 200) {
                console.log(res);
                setReviews(res.data.payload || []);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        getReviews();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredReviews = reviews.filter((review) =>
        review.station.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentData = filteredReviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);

    const handleWriteButtonClick = () => {
        navigate("/community/posting");
    };

    return (
        <>
            <StationSearch onSearch={handleSearch} />
            <List sx={{ width: "100%", maxWidth: 360 }}>
                {currentData.length > 0 ? (
                    currentData.map((review, index) => (
                        <ListItem key={index} sx={{ flexDirection: "column" }}>
                            <Box
                                sx={{
                                    display: "inline-block",
                                    alignContent: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Typography variant="h6">{review.station}</Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2">작성자: {review.User.username}</Typography>
                                    <Typography variant="body2">
                                        작성일: {new Date(review.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignContent: "center",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Typography variant="body1" component="span">
                                    {"⭐".repeat(review.starscore)}
                                </Typography>
                                <Typography component="span" variant="subtitle1">
                                    {review.content}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1">리뷰를 작성해주세요.</Typography>
                )}
            </List>
            <PageCount
                page={page}
                count={Math.ceil(filteredReviews.length / reviewsPerPage)}
                handleChangePage={handleChangePage}
                sx={{ marginBottom: "20px" }}
            />
            <Button variant="text" onClick={handleWriteButtonClick} sx={{ marginBottom: "50px", marginTop: "-20px" }}>
                작성하기
            </Button>
        </>
    );
};

export default Review;
