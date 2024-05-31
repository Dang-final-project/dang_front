import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "./../../../hooks/useIntersectionObserver";
import ReviewList from "./ReviewList";
import PostButton from "./PostButton";
import ScrollToTopButton from "./ScrollTopButton";
import { Container, ListItem, Typography } from "@mui/material";

const MobileReview = ({ handleWriteButtonClick, reviews, reviewsPerPage }) => {
    const intersectionRef = useRef(null);
    const intersectionObserver = useIntersectionObserver({ ref: intersectionRef, options: {} });

    const [page, setPage] = useState(1);
    const maxPage = Math.ceil(reviews?.length / reviewsPerPage);

    useEffect(() => {
        if (intersectionObserver?.isIntersecting) {
            setPage((prevPage) => (prevPage += 1));
        }
    }, [intersectionObserver]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Container maxWidth="sm" sx={{ p: 3 }}>
            <PostButton handleWriteButtonClick={handleWriteButtonClick} />
            <ReviewList reviews={reviews} page={page} reviewsPerPage={reviewsPerPage} />
            {page >= maxPage && (
                <ListItem alignItems="center" sx={{ flexDirection: "column", py: 3 }}>
                    <Typography>✔️ 모든 목록을 다 읽었어요.</Typography>
                </ListItem>
            )}
            <div ref={intersectionRef}></div>
            <ScrollToTopButton onClick={scrollToTop} />
        </Container>
    );
};

export default MobileReview;
