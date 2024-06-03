import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { reviewApi } from "../../../api/services/review";
import ReviewList from "./ReviewList";
import PostButton from "./PostButton";
import StationSearch from "./StationSearch";
import PageCount from "../utils/PageCount";
import MobileReview from "./MobileReview";
import { useMediaQuery, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); //검색
    const reviewsPerPage = 3;
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const token = localStorage.getItem("token");
    const { logout } = useAuth();

    const theme = useTheme();
    const tabletWidth = useMediaQuery(theme.breakpoints.up("md"));

    const getReviews = async () => {
        try {
            const res = await reviewApi.getAll(token);
            if (res.data.code === 200) {
                const r = res.data.payload;
                const fr = r.filter((review) => review.station.toLowerCase().includes(searchQuery.toLowerCase()));
                setReviews(fr || []);
            }
        } catch (error) {
            if (error.response.data.code === 500) {
                logout(() => {
                    console.error(error);
                    navigate("/");
                });
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleWriteButtonClick = () => {
        navigate("/community/posting");
    };

    useEffect(() => {
        getReviews();
    }, [searchQuery]); // 검색어가 변경될 때마다 검색을 수행

    return (
        <>
            <StationSearch onSearch={handleSearch} />
            {tabletWidth && reviews ? (
                <>
                    <ReviewList
                        isDesktop={tabletWidth}
                        reviews={reviews}
                        searchQuery={searchQuery}
                        page={page}
                        reviewsPerPage={reviewsPerPage}
                    />
                    <PostButton handleWriteButtonClick={handleWriteButtonClick} />
                    <PageCount
                        page={page}
                        count={Math.ceil(reviews.length / reviewsPerPage)}
                        handleChangePage={handleChangePage}
                        sx={{ marginBottom: "10px" }}
                    />
                </>
            ) : (
                <MobileReview
                    handleWriteButtonClick={handleWriteButtonClick}
                    reviews={reviews}
                    reviewsPerPage={reviewsPerPage}
                />
            )}
        </>
    );
};

export default Review;
