import axios from 'axios';

async function getQuizzes(pageIndex = 0, pageSize = 5) {
  const { data } = await axios.get('/quizzes');
  const startIndex = pageIndex * pageSize;

  return {
    page: {
      pageIndex, // 현재 페이지 인덱스
      pageSize, // 한 페이지당 표시할 항목 수
      totalElementCount: data.length, // 전체 항목 수
      totalPageCount: Math.ceil(data.length / pageSize), // 전체 페이지 수
    },
    data: data.slice(startIndex, startIndex + pageSize),
  };
}

export default {
  getQuizzes,
};