import { useTheme } from "@emotion/react";
import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import ReportDriver from "./ReportDriver";
import MyReport from "./MyReport";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useAuth } from "../../../hooks/useAuth";

const Report = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const { loginUser } = useAuth();
    const [reports, setReports] = useState([]);
    const cookies = new Cookies();
    const kakaoId = cookies.get("userId");
    const kakaoToken = cookies.get("accessToken");
    const getReports = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/community/report`, {
                headers: {
                    Authorization: loginUser?.token || kakaoToken,
                },
                params: {
                    userId: loginUser?.id || kakaoId,
                },
            });
            if (res.data.code === 200) {
                setReports(res.data.payload);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getReports();
    }, []);

    return (
        <Grid
            sx={{
                display: "flex",
                flexDirection: isDesktop ? "row" : "column",
                marginTop: "50px",
                marginLeft: "-40px",
            }}
        >
            <ReportDriver
                isDesktop={isDesktop}
                theme={theme}
                getReports={getReports}
                loginUser={loginUser}
                kakaoId={kakaoId}
            />
            <MyReport reports={reports} />
        </Grid>
    );
};

export default Report;
