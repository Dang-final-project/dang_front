import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import kakaoLoginImg from "../../assets/kakao_login_large_wide.png";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const RedOutlinedInput = styled(OutlinedInput)(({ theme, error }) => ({
    borderColor: error ? "red" : "inherit",
    "& fieldset": {
        borderColor: error ? "red" : "inherit",
    },
    "& input": {
        padding: "16px 14px", // 기본 입력 칸 높이를 높이기 위해 패딩을 추가
    },
}));

const Login = () => {
    const authData = useAuth();
    const navigate = useNavigate();
    const { login } = authData;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data) => {
        if (!data.email || !data.password) {
            return;
        }

        try {
            await login((response) => {
                if (response.data.code === 200) {
                    setLoginError("");
                    navigate("/");
                } else {
                    setLoginError("아이디 또는 비밀번호가 잘못되었습니다.");
                }
            }, data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "로그인 실패",
                text: "아이디 또는 비밀번호가 잘못되었습니다.",
            });
        }
        reset();
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "80%", maxWidth: "400px" }}>
                <FormControl sx={{ width: "100%", mb: 2 }} error={Boolean(errors.email) || Boolean(loginError)}>
                    <InputLabel htmlFor="email">아이디</InputLabel>
                    <RedOutlinedInput
                        id="email"
                        placeholder="아이디를 입력하세요"
                        type="text"
                        variant="outlined"
                        {...register("email", { required: "아이디는 필수값입니다." })}
                        label="아이디"
                        error={Boolean(errors.email) || Boolean(loginError)}
                    />
                    {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
                </FormControl>
                <FormControl sx={{ width: "100%", mb: 2 }} error={Boolean(errors.password) || Boolean(loginError)}>
                    <InputLabel htmlFor="password">비밀번호</InputLabel>
                    <RedOutlinedInput
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        type="password"
                        variant="outlined"
                        {...register("password", { required: "비밀번호는 필수값입니다." })}
                        label="비밀번호"
                        error={Boolean(errors.password) || Boolean(loginError)}
                    />
                    {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
                </FormControl>
                {loginError && !errors.email && !errors.password && (
                    <span style={{ display: "block", color: "red", fontSize: "0.8rem", marginBottom: "16px" }}>
                        {loginError}
                    </span>
                )}
                <Button variant="contained" type="submit" sx={{ display: "block", width: "100%", mt: 2 }}>
                    로그인
                </Button>
                <Link to={`${process.env.REACT_APP_API_URL}/auth/kakao`}>
                    <img src={kakaoLoginImg} alt="카카오 로그인" style={{ width: "100%", marginTop: "16px" }} />
                </Link>
            </form>
        </div>
    );
};

export default Login;
