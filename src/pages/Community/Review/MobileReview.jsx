import { useCallback, useEffect, useRef, useState } from "react";
import useIntersectionObserver from './../../../hooks/useIntersectionObserver';
import reviewService from '../utils/review';

const MobileReview = () => {
    const intersectionRef = useRef(null);
    const intersectionObserver = useIntersectionObserver({ ref: intersectionRef, options: {} });

    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [pageIndex, setPageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const hasNextPage = useMemo(() => page.pageIndex === undefined || page.totalPageCount > page.pageIndex + 1, [page]);

    const fetchReviews = useCallback(async () => {
        const fetchReviews = await reviewService.getReview(pageIndex);
        console.log(fetchReviews);
        setReviews((prevReviews) => prevReviews.concat(fetchReviews.data));
        setPage(fetchReviews.page);
      }, [pageIndex]);
    
      useEffect(() => {
        if (hasNextPage && intersectionObserver?.isIntersecting) {
          setPageIndex((prevPageIndex) => (prevPageIndex += 1));
        }
      }, [intersectionObserver, hasNextPage]);

      useEffect(() => {
        if (hasNextPage) {
          fetchReviews(pageIndex);
        }
      }, [pageIndex, hasNextPage]);

      const filteredReviews = reviews.filter((review) =>
        review.station.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return ( 
        <>
        </>
     );
}
 
export default MobileReview;