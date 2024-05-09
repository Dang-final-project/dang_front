import { Container } from "@mui/material";

const Main = ({children}) => {
    return ( 
        <Container sx={{minHeight : '100vh'}}>
            {children}
        </Container>
     );
}
 
export default Main;