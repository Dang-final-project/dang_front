import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { authApi } from "../../../api/services/auth";
import { useAuth } from './../../../hooks/useAuth';
import bcrypt from 'bcryptjs';

const ModifyInfo = () => {
    const { loginUser } = useAuth();
    const email = loginUser.email; // 고정된 이메일 값
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();
    const navigate = useNavigate();

    const modify = async(e) => {
        // e.preventDefault();
        try {
            const hashedPassword = await bcrypt.hash(e.password, 10);
            const data = { username: e.username, password: hashedPassword };
            // const data = {username: e.username, password: e.password};
            const token = loginUser.token;
            const res = await authApi.authPut(data, token);
            
            if (res.data.code === 200) {
                Swal.fire({
                    title: "축하합니다!",
                    text: "수정이 완료되었습니다.",
                    icon: "success"
                });
                console.log(res);
                navigate('/');
            } 
        } catch (err) {
            console.error(err);

            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
        }
    }

    const deleteButton = async(e) => {
        const data = { username: e.username };
        const token = loginUser.token;
        const res = await authApi.authDel(data, token);
        try{
            if(res.data.code === 200){
                Swal.fire({
                    title: "삭제되었습니다.",
                    text: "삭제되었습니다.",
                    icon: "success"
                });
            }
        } catch(err){
            console.error(err);
        }
    }
    
    return ( 
        <>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(modify)}
                sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            >
                <TextField disabled variant="outlined" label="이메일" defaultValue={email}
                    sx={{ display: 'block' }} fullWidth
                />
                <TextField variant="outlined" label="이름" autoComplete="username"
                    error={errors.username ? true : false}
                    helperText={errors.username && errors.username.message}
                    sx={{ display: 'block' }} fullWidth 
                    {...register("username", { value: loginUser.nickname, required: "이름을 입력해주세요." })}
                />
                <TextField variant="outlined" label="비밀번호" type="password"
                    error={errors.password ? true : false}
                    helperText={errors.password && errors.password.message}
                    sx={{ display: 'block' }} fullWidth
                    {...register("password", {
                        required: "비밀번호를 입력해주세요.",
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
                <TextField
                    id="PasswordCheck"
                    fullWidth
                    autoComplete="new-password"
                    error={errors.passwordCheck ? true : false}
                    helperText={errors.passwordCheck && errors.passwordCheck.message}
                    type='password'
                    label="비밀번호 확인"
                    {...register("passwordCheck", { 
                        required: "비밀번호 확인을 입력해주세요.",
                        validate: value => value === getValues("password") || "비밀번호가 일치하지 않습니다."
                    })}
                />
                <Typography sx={{ m: 1 }}>권한: 사용자</Typography>
                <Button type="submit" variant="contained" size="large" fullWidth>
                    수정하기
                </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6">회원 탈퇴</Typography>
                <Typography variant="subtitle1">탈퇴 약정</Typography>
                <Button type="button" variant="contained" size="large" fullWidth onClick={deleteButton}>
                    탈퇴하기
                </Button>
            </Box>
        </>
    );
}

export default ModifyInfo;
