import { Route, Routes } from "react-router-dom";

// import Layout from "./layouts/layout";
import Home from "./pages/Home";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import Community from "./pages/Community";
import Cost from "./pages/Cost";
import Mypage from "./pages/Mypage";
import { LoginContext } from "./contexts/LoginContext";
import { useProvideAuth } from "./hooks/useProvideAuth";
import Layout from "./components/layouts/layout";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#336dff",
            },
            secondary: {
                main: "#FFCF32",
                contrastText: "#000000",
            },
        },
    });

    console.log(theme);
    const auth = useProvideAuth();


    const isLoggedIn = false;

    return (
        <>
            <ThemeProvider theme={theme}>
                <LoginContext.Provider value={auth}>
                    <CssBaseline />
                    <Layout>
                        <Routes>
                            {isLoggedIn ? (
                                <>
                                    <Route path="/admin" element={<Admin />} />
                                    <Route path="/community" element={<Community />} />
                                    <Route path="/mypage" element={<Mypage />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/join" element={<Join />} />
                                </>
                            )}
                            <Route path="/" element={<Home />} />
                            <Route path="/cost" element={<Cost />} />
                        </Routes>
                    </Layout>
                </LoginContext.Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
