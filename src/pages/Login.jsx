import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useAuth } from "../hooks/useAuth";
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import kakaoLoginImg from '../assets/kakao_login_medium_wide.png';
import { Link } from 'react-router-dom';


const Home = () => {
    const { loginUser, login } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // 로그인 시켜주기
        login((res) => {
        if (res.data.code !== 200) {
            // Toast.fire({
            // icon: "error",
            // title: "틀렸습니다.",
            // text: '아이디 또는 비밀번호를 다시 확인해주세요'
            // });
        }
        }, data)
        reset();
    };
    // console.log(watch("email")) 이메일 변경시 값 확인

    return (
    <>
        {
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ width: '25ch', bgcolor: '#ffcf32', display: 'block'}}>
                <OutlinedInput sx={{ width: '25ch'}} type='text' variant="outlined" {...register("id", { required: true })}/> 
                {errors.id && <span style={{ display: 'block' }}>아이디는 필수값입니다</span>}
            </FormControl>
            <FormControl sx={{ width: '25ch',  bgcolor: '#ffcf32', display: 'block'}}>
                <OutlinedInput sx={{ width: '25ch'}} type='password' variant="outlined" {...register("password", { required: true })}/>
                {errors.password && <span style={{ display: 'block' }}>비밀번호는 필수값입니다</span>}
            </FormControl>
            <Button variant="contained" color="mainColor" type="submit" 
                    sx={{color: 'bgColor1.main', display: 'block', width:'100%'}}>
                로그인
            </Button>
            <Link to='/#'>
            <img src={kakaoLoginImg} alt='카카오 로그인' style={{width: '25ch'}}/>
            </Link>
        </form>
        }
    </>
    );
    }
    

export default Home;