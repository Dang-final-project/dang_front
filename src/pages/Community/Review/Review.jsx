import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { reviewApi } from "../../../api/services/review";
import ReviewList from './ReviewList';
import PostButton from './PostButton';
import StationSearch from './StationSearch';
import PageCount from '../utils/PageCount';

import useIntersectionObserver from './../../../hooks/useIntersectionObserver';
import reviewService from '../utils/review';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const reviewsPerPage = 3;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { logout } = useAuth();
  const getReviews = async () => {
    try {
      // const token = loginUser.token;
      const res = await reviewApi.getAll(token);
      if (res.data.code === 200) {
        console.log(res);
        setReviews(res.data.payload || []);
      }
    } catch (error) {
      if(error.response.data.code == 500) {
        logout(()=>{
          console.error(error);
          navigate('/')
        })
      }
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

  const handleWriteButtonClick = () => {
    navigate('/community/posting');
  };

  const filteredReviews = reviews.filter((review) =>
    review.station.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <StationSearch onSearch={handleSearch} />
      <ReviewList
        reviews={reviews}
        searchQuery={searchQuery}
        page={page}
        reviewsPerPage={reviewsPerPage}
      />
      <PostButton handleWriteButtonClick={handleWriteButtonClick} />
      <PageCount
        page={page}
        count={Math.ceil(filteredReviews.length / reviewsPerPage)}
        handleChangePage={handleChangePage}
        sx={{ marginBottom: '10px' }}
      />
    </>
  );
};

export default Review;
