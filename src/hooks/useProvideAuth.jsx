import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
// import KakaoMap from "./../components/map/KakaoMap";
import { jwtDecode } from "jwt-decode";

export const useProvideAuth = () => {
    const [loginUser, setLoginUser] = useState({
        id: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
        nickname: "",
        email: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setLoginUser((prevUser) => ({
                    ...prevUser,
                    nickname: decodedToken.nickname,
                    email: decodedToken.email,
                }));
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    useEffect(() => {
        const kakaoToken = cookies.get("accessToken");
        if (kakaoToken) {
            try {
                const decodedKakaoToken = jwtDecode(kakaoToken);
                setLoginUser((prevUser) => ({
                    ...prevUser,
                    nickname: decodedKakaoToken.nickname,
                }));
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    const kakaoLogin = () => {
        const cookies = new Cookies();

        if (cookies.get("accessToken") && cookies.get("userId")) {
            localStorage.setItem("userId", cookies.get("userId"));
            localStorage.setItem("token", cookies.get("accessToken"));

            setLoginUser({
                id: cookies.get("userId"),
                token: cookies.get("accessToken"),
                nickname: "",
            });
        }
        cookies.remove("userId");
        cookies.remove("accessToken");
    };

    const login = async (callback, data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);
            if (response.data.code === 200) {
                const id = response.data.userId;
                const token = response.data.accessToken;

                localStorage.setItem("userId", id);
                localStorage.setItem("token", token);

                const decodedToken = jwtDecode(token);

                setLoginUser({
                    id: id,
                    token,
                    nickname: decodedToken.nickname,
                    email: decodedToken.email,
                });
            }
            callback(response);
        } catch (error) {
            console.error(error);
        }
    };
    const cookies = new Cookies();
    const logout = (callback) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        cookies.remove("userId");
        cookies.remove("accessToken");
        setLoginUser(null);
        // 리프레시 토큰 삭제
        callback();
    };

    return {
        loginUser,
        login,
        logout,
        kakaoLogin,
    };
};
