import { Button, InputLabel, TextField, Box, FormControl, OutlinedInput, InputAdornment, IconButton, } from '@mui/material/'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Join = () => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    //비밀번호 일치 검증
    const password = watch("password", "");
    const passwordCheck = watch("passwordCheck", "");

    const onSubmit = (data) => console.log(data);


    return ( 
        <>
            <h1>회원가입</h1>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width : '100%',
                    maxWidth : '460px',
                    gap: '16px'
                }}
            >
                <TextField
                    error={errors.email ? true : false}
                    helperText={errors.email && errors.email.message}
                    label="이메일"
                    variant="outlined"
                    sx={{ display: 'block' }}
                    fullWidth
                    autoFocus
                    {...register("email", {
                        required: "이메일은 필수 입력 항목입니다.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "올바른 이메일 형식을 입력하세요."
                        }
                    })}
                />
                {/* nickname */}
                <TextField
                    error={errors.usename ? true : false}
                    helperText={errors.usename && errors.usename.message}
                    label="이름"
                    variant="outlined"
                    fullWidth
                    autoComplete="usename"
                    sx={{ display: 'block' }}
                    {...register("usename", { 
                        required: "이름은 필수 입력 항목입니다."
                    })}
                />
                {/* password */}
                <FormControl fullWidth sx={{ display: 'block' }} variant="outlined">
                    <TextField
                        error={errors.password ? true : false}
                        helperText={errors.password && errors.password.message}
                        id="password"
                        fullWidth
                        type='password'
                        autoComplete="new-password"
                        label="비밀번호"
                        {...register("password", {
                            required: "비밀번호는 필수 입력 항목입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상이어야 합니다."
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "비밀번호는 하나의 영어 알파벳과 숫자를 포함해야 합니다."
                            }
                        })}
                    />
                </FormControl>
                {/* password check */}
                <FormControl fullWidth sx={{display: 'block' }} variant="outlined">
                    <TextField
                        id="PasswordCheck"
                        fullWidth
                        autoComplete="new-password"
                        error={errors.passwordCheck ? true : false}
                        helperText={errors.passwordCheck && errors.passwordCheck.message}
                        type='password'
                        label="비밀번호 확인"
                        {...register("passwordCheck", { 
                            required: true,
                            validate: value => value === password || "비밀번호가 일치하지 않습니다."
                        })}
                    />
                </FormControl>
                {/* button */}
                <Box mt={3} sx={{width : '100%', display: 'flex', gap:'8px', flexDirection: {sm : 'row', xs: 'column-reverse'}}} >
                    <Button variant="outlined" onClick={(e) => {
                        e.preventDefault()
                        reset();
                    }} >초기화</Button>
                    <Button type='suibmit' variant="contained" size="large">회원가입</Button>
                </Box>
                
            </Box>
        </> 
    );
}
 
export default Join;