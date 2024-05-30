import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from './../../../hooks/useIntersectionObserver';
import ReviewList from './ReviewList';
import PostButton from './PostButton';
import { Box, Container, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MobileReview = ({handleWriteButtonClick, reviews, reviewsPerPage}) => {
    const intersectionRef = useRef(null);
    const intersectionObserver = useIntersectionObserver({ ref: intersectionRef, options: {} });

    const [page, setPage] = useState(1);
    const maxPage = Math.ceil(reviews?.length / reviewsPerPage);
    
    useEffect(() => {
      console.log(intersectionObserver?.isIntersecting);
      if (intersectionObserver?.isIntersecting) {
        setPage((prevPage) => (prevPage += 1));
      }
    }, [intersectionObserver]);

    return ( 
      <Container maxWidth="sm" sx={{ p: 12 }} >
        <Box>
          <Link href="main" underline="always" variant="body2"></Link>
        </Box>
        <PostButton handleWriteButtonClick={handleWriteButtonClick} />
        <ReviewList
          reviews={reviews}
          page={page}
          reviewsPerPage={reviewsPerPage}
        >          
        </ReviewList>
        {(page >= maxPage) && (
            <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', py: 12 }}>
              <Typography>✔️ 모든 목록을 다 읽었어요.</Typography>
            </ListItem>
          )}
        <div ref={intersectionRef}></div>
      </Container>
     );
}
 
export default MobileReview;