import api from "../api";

export const postApi = {
    reviewPost : (data, token) => api.post('/community/review', data, {
        headers : {
            Authorization: token
        }
    })
}