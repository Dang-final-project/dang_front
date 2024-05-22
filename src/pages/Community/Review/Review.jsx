import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../components/input/SearchInput";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Box, Button } from "@mui/material";
import axios from "axios";
import {useAuth} from "../../../hooks/useAuth";


const Review = () => {
    const [reviews, setReviews] = useState([]); // 초기값을 빈 배열로 설정
    const navigate = useNavigate();
    const { loginUser, logout } = useAuth();

    const getReviews = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/community/review`, {
                headers: {
                    Authorization: loginUser.token
                }
            });
            if (res.data.code === 200) {
                setReviews(res.data.payload || null);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };
    

    useEffect(() => {
        getReviews();
    }, []);

    const handleWriteButtonClick = () => {
        navigate("/community/posting");
    };

    return (
        <>
            <SearchInput width='100%' />
            <List sx={{ width: '100%', maxWidth: 360, }}>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <ListItem key={index} sx={{ flexDirection: "column" }}>
                            <Box sx={{ display: "flex", alignContent: "center", justifyContent: "space-between", width: '100%' }}>
                                <Typography variant="body1">{review.station}</Typography>
                                <Typography variant="body1">
                                    작성자: {review.User.username}
                                </Typography>
                                <Typography variant="body1">
                                    작성일: {new Date(review.created_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "flex-start", width: '100%' }}>
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
                    <Typography variant="body1">리뷰가 없습니다.</Typography>
                )}
            </List>
            <Button variant="text" onClick={handleWriteButtonClick}>작성하기</Button>
        </>
    );
}

export default Review;
