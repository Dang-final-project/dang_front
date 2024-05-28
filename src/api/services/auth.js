import api from "../api"

export const authApi = {
    authPut:( data, token ) => api.patch('/mypage', data, {
        headers: {
            Authorization: token
        }
    }
    )
}
