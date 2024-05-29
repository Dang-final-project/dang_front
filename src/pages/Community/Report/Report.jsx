import { useTheme } from "@emotion/react";
import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import ReportDriver from "./ReportDriver";
import MyReport from "./MyReport";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useAuth } from "../../../hooks/useAuth";
import { communityApi } from "../../../api/services/community";
import { useNavigate } from "react-router-dom";

const Report = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const { loginUser, logout } = useAuth();
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const cookies = new Cookies();
    const kakaoId = cookies.get("userId");
    const kakaoToken = cookies.get("accessToken");
    const getReports = async () => {
        try {
            const userId = loginUser?.id || kakaoId;
            const token = loginUser?.token || kakaoToken;
            const res = await communityApi.getReport(userId, token);
            if (res.data.code === 200) {
                setReports(res.data.payload);
            }
        } catch (err) {
            if(err.response.data.code == 500) {
                logout(()=>{
                  console.error(err);
                  navigate('/')
                })
              }
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
                marginLeft: isDesktop ? "-40px" : 0,
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
