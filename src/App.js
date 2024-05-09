import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/Home";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";


function App() {

  const theme = createTheme({});
  return (
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes >
            <Route path='/' element={<Home />} />
          </Routes>
        </Layout>
    </ThemeProvider>
    </>
  )
}

export default App;
