import axios from 'axios';

async function getReview(pageIndex = 0, pageSize = 5) {
  const { data } = await axios.get('/quizzes', {
    params: {
      pageIndex,
      pageSize,
    },
  });
  
  const startIndex = pageIndex * pageSize;

  return {
    page: {
      pageIndex,
      pageSize,
      totalElementCount: data.length,
      totalPageCount: Math.ceil(data.length / pageSize),
    },
    data: data.slice(startIndex, startIndex + pageSize),
  };
}

export default {
  getReview,
};
