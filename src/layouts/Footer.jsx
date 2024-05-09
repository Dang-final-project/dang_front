import { Container, Typography } from "@mui/material";
import styled from "styled-components";

const Footer = () => {

    const textStyle = {
        textAlign : 'center',
        color: 'grey.300'
    }

    return ( 
        <StyleFooter>
            <Container sx={{pt: 3, pb: 3}}>
                <Typography gutterBottom sx={textStyle}>
                    2024 멀티잇 부트캠프 파이널 프로젝트
                </Typography>
                <Typography gutterBottom sx={textStyle}>
                    당충전
                </Typography>
            </Container>
        </StyleFooter>
     );
}

const StyleFooter = styled.footer`
    background-color: #212121;
    height: 120px;
`
 
export default Footer;
