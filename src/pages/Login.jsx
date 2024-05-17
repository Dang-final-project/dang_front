import React, { useState } from 'react'; // useState import 추가
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useAuth } from "../hooks/useAuth";
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import kakaoLoginImg from '../assets/kakao_login_large_wide.png';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '../components/text_input/TextInput';
import { InputLabel, TextField } from '@mui/material';

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

    const onSubmit = (data) => {
        try {
            login((response)=>{
                console.log(response.data.code)
                if (response.data.code === 200) {
                    navigate("/");
                } else {
                    throw new Error('error message');
                }
            }, data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: '로그인 실패',
                text: '아이디 또는 비밀번호가 잘못되었습니다.'
            });
        }
        reset();
    };
    console.log(errors)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '60%', maxWidth: '600px' }}>
                <FormControl sx={{ width: '80%', display: 'block', mb: 2 }}>
                    <InputLabel htmlFor="email">아이디</InputLabel>
                    <OutlinedInput
                        id="email"
                        placeholder="아이디를 입력하세요"
                        type="text"
                        variant="outlined"
                        {...register("email", { required: true })}
                        label="아이디"
                        sx={{ width: '100%' }} // 이 줄을 추가하여 입력 필드의 너비를 100%로 설정
                    />
                    {errors.email && <span style={{ color: 'red' }}>이메일은 필수값입니다.</span>}
                </FormControl>
                <FormControl sx={{ width: '80%', display: 'block', mb: 2 }}>
                    <InputLabel htmlFor="password">비밀번호</InputLabel>
                    <OutlinedInput
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        type="password"
                        variant="outlined"
                        {...register("password", { required: true })}
                        label="비밀번호"
                        sx={{ width: '100%' }} // 이 줄을 추가하여 입력 필드의 너비를 100%로 설정
                    />
                    {errors.password && <span style={{ color: 'red' }}>비밀번호는 필수값입니다.</span>}
                </FormControl>
                {errors.loginFail && <span style={{ display: 'block', color: 'red', fontSize: '0.8rem' }}>{errors.loginFail.message}</span>}
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ display: 'block', width: '80%', mt: 2 }}
                >
                    로그인
                </Button>
                <Link to={`${process.env.REACT_APP_API_URL}/auth/kakao`}>
                    <img src={kakaoLoginImg} alt='카카오 로그인' style={{ width: '80%', mt: 2 }}/>
                </Link>
            </form>
        </div>
    );
}

export default Login;
