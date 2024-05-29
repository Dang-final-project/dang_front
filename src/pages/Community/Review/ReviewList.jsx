import React from 'react';
import { List, Typography, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    ...theme.typography.body2,
    backgroundColor: "#eeeeee",
  }));

const ReviewList = ({ reviews, searchQuery, page, reviewsPerPage }) => {
  const filteredReviews = reviews.filter((review) =>
    review.station.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredReviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);

  return (
    <List sx={{ width: '100%', margin: '0 auto' }}>
      {currentData.length > 0 ? (
        currentData.map((review, index) => (
          <DemoPaper key={index} elevation={5}>
            <Box
              sx={{
                display: 'inline-block',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography variant="h6">{review.station}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">작성자: {review.User ? review.User.username : '알 수 없음'}</Typography>
                <Typography variant="body2">
                  작성일: {new Date(review.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
              <Typography variant="body1" component="span">
                {'⭐'.repeat(review.starscore)}
              </Typography>
              <Typography component="span" variant="subtitle1">
                {review.content}
              </Typography>
            </Box>
          </DemoPaper>
        ))
      ) : (
        <Typography variant="body1" align="center">리뷰를 작성해주세요.</Typography>
      )}
    </List>
  );
};

export default ReviewList;
