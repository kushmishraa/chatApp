import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { Login } from "../pages/LoginPage";

function CustomRoutes() {

    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )

}

export default CustomRoutes
