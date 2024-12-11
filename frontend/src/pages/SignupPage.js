import React from "react";
import { FormHoc } from "../HigherOrderComponent/FormHOC";
import { SignupForm } from "../Components/SignupForm";

export const SignupPage = () =>{
    const Signup = FormHoc(SignupForm)
    return(
        <div>
            <Signup/>
        </div>
    )
}