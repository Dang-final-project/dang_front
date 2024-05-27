import api from "../api";

export const reviewApi = {
    reviewPost : (data, token) => api.post('/community/review', data, {
        headers : {
            Authorization: token
        }
    }),
    getAll : (token) => api.get('/community/review', {
        headers : {
            Authorization: token
        }
    }) 
}