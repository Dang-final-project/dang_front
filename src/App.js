import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/Home";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { TextInput } from "./components/text_input/TextInput";
import { TextArea } from "./components/text_input/TextArea";


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#336dff',
      },
      secondary:{
        main:'#FFCF32',
        contrastText:'#00000'
      }
    }
  });

  console.log(theme)

  return (
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes >
            <Route path='/' element={<Home />} />
          </Routes>
          <TextInput/>
          <TextArea/>
        </Layout>
    </ThemeProvider>
    </>
  )
}

export default App;
