import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/LoginPage";

import App from "../App";
import { SignupPage } from "../pages/SignupPage";
import { ForgetPassword } from "../pages/ForgetPasswordPage";

function CustomRoutes() {
    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forget" element={<ForgetPassword />} />
        </Routes>
    )
}

export default CustomRoutes
