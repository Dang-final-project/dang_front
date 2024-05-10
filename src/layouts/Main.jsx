import { Container } from "@mui/material";

const Main = ({ children }) => {
    return <Container sx={{ minHeight: "calc(100vh - 120px)", marginTop: "120px" }}>{children}</Container>;
};

export default Main;
