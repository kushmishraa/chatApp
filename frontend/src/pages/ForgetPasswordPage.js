import React from "react";
import { FormHoc } from "../HigherOrderComponent/FormHOC";
import { ForgetPasswordForm } from "../Components/ForgetPasswordForm";

export const ForgetPassword = () =>{
    const ForgetPassword = FormHoc(ForgetPasswordForm)
    return(
        <div>
            <ForgetPassword />
        </div>
    )
}