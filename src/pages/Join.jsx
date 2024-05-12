import { Box, Stack } from "@mui/material";
import TextInput from '../components/input/TextInput'

const Join = () => {
    return ( 
        <>
            <h1>회원가입</h1>
            <Stack spacing={2} >
                <TextInput />
            </Stack>
        </> 
    );
}
 
export default Join;