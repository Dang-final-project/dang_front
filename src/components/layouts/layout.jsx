import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import Main from "./Main";
import { MapProvider } from "../../contexts/MapContext";
import Header from "./Header/Header";

const Layout = ({ children }) => {
    return (
        <BrowserRouter>
            <Header />
            <MapProvider>
                <Main>{children}</Main>
                <Footer />
            </MapProvider>
        </BrowserRouter>
    );
};

export default Layout;
