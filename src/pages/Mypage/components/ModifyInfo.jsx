import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const ModifyInfo = () => {
    const {register} = useForm();
    return ( 
        <Box>
             <TextField disabled variant="outlined" label="이메일" defaultValue="zeus@gmail.com"
                sx={{display: 'block'}} fullWidth
            />
        </Box>
    );
}
 
export default ModifyInfo;