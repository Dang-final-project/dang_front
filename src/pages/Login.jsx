import React, { useState } from 'react'; // useState import 추가
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useAuth } from "../hooks/useAuth";
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import kakaoLoginImg from '../assets/kakao_login_large_wide.png';
import { Link } from 'react-router-dom';
import { TextInput } from '../components/text_input/TextInput';

const Login = () => {
    const authData = useAuth();
    const { loginUser, login } = authData ? authData : { loginUser: {}, login: () => {} };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => { // async 키워드 추가
        try {
            const response = await login(data); // await 키워드 추가
            const token = response.data.accessToken; // 토큰은 응답의 accessToken에서 가져옴
            localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장
            console.log(token);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '로그인 실패',
                text: '아이디 또는 비밀번호가 잘못되었습니다.'
            });
        }
        reset();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '60%', maxWidth: '600px' }}>
                <TextInput 
                    label='아이디'
                    defaultValue='아이디를 입력하세요'
                    size='medium'
                >
                    <OutlinedInput sx={{ width: '100%' }} type='text' variant="outlined" {...register("id", { required: true })}/> 
                    {errors.id && <span style={{ display: 'block' }}>아이디는 필수값입니다</span>}
                </TextInput>
                <TextInput 
                    label='비밀번호'
                    defaultValue=''
                    size='medium'
                >
                    <OutlinedInput sx={{ width: '100%' }} type='password' variant="outlined" {...register("password", { required: true })}/>
                    {errors.password && <span style={{ display: 'block' }}>비밀번호는 필수값입니다</span>}
                </TextInput>
                <Button variant="contained" type="submit" sx={{ display: 'block', width: '80%', mt: 2 }}>
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
