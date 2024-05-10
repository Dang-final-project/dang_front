import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useAuth } from "../hooks/useAuth";
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import kakaoLoginImg from '../assets/kakao_login_large_wide.png';
import { Link } from 'react-router-dom';
import { TextArea } from '../components/text_input/TextArea';
import { TextInput } from '../components/text_input/TextInput';

const Login = () => {
    const authData = useAuth();
    const { loginUser, login } = authData ? authData : { loginUser: {}, login: () => {} };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        login((res) => {
            if (res.data.code !== 200) {
                // Error handling
            }
        }, data)
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
                    defaultValue='비밀번호를 입력하세요'
                    size='medium'
                >
                    <OutlinedInput sx={{ width: '100%' }} type='password' variant="outlined" {...register("password", { required: true })}/>
                    {errors.password && <span style={{ display: 'block' }}>비밀번호는 필수값입니다</span>}
                </TextInput>
                <Button variant="contained" type="submit" sx={{ display: 'block', width: '80%', mt: 2 }}>
                    로그인
                </Button>
                <Link to='/#'>
                    <img src={kakaoLoginImg} alt='카카오 로그인' style={{ width: '80%', mt: 2 }}/>
                </Link>
            </form>
        </div>
    );
}

export default Login;
