import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { validateuser } from "../Slices/userSlice";
import { ForgetPasswordForm } from "../Components/ForgetPasswordForm";
import { FormHoc } from "../HigherOrderComponent/FormHOC";
import { LoginForm } from "../Components/LoginForm";

export const Login = () => {
    const loggedInUser = useSelector((state)=> state.user.loggedInUser)
    const LoginFormHoc = FormHoc(LoginForm)


    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh"}}>
            <div>
                <LoginFormHoc />
            </div>
        </div>
    )
}