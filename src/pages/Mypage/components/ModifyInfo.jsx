import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const ModifyInfo = () => {
    const {register, formState: { errors },} = useForm();
    return ( 
        <>
        <Box component="form" noValidate autoComplete="off"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
        >
            <TextField disabled variant="outlined" label="이메일" defaultValue="zeus@gmail.com"
                sx={{display: 'block'}} fullWidth
            />
            <TextField variant="outlined" label="이름" autoComplete="username"
                error={errors.username ? true : false}
                helperText={errors.username && errors.username.message}
                sx={{ display: 'block' }} fullWidth 
            />
            <TextField variant="outlined" label="비밀번호" 
                error={errors.password ? true : false}
                helperText={errors.password && errors.password.message}
                sx={{display: 'block'}} fullWidth
                {...register("password", {
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
                    required: true,
                    // validate: value => value === password || "비밀번호가 일치하지 않습니다."
                })}
            />
            <Typography>권한: 사용자</Typography>
        </Box>
        <Button type='suibmit' variant="contained" size="large" sx={{width: '50%'}}>수정하기</Button>

        <Box>
            <Typography variant="h6">회원 탈퇴</Typography>
            <Typography variant="subtitle1">탈퇴 약정</Typography>
        </Box>
        <Button type='suibmit' variant="contained" size="large" sx={{width: '50%'}}>탈퇴하기</Button>
        </>
        
    );
}
 
export default ModifyInfo;