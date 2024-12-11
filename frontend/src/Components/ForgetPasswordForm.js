import React, { useEffect, useState } from "react";
import { updatePassword } from "../Slices/userSlice";
import { useDispatch } from "react-redux";

export const ForgetPasswordForm = ({formValues, updateFormValue, handleFormSubmit, emptyFormValues}) =>{
    // useEffect(()=>{
    //     return(()=>{
    //         emptyFormValues();
    //     })
    // });

    const dispatch = useDispatch();

    const handleForgetPassword = () =>{
        dispatch(updatePassword(formValues));
    }

    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
            <form onSubmit={(e)=>handleFormSubmit(e,"forgetPassword",handleForgetPassword)} style={{display:'flex', flexDirection:'column', gap:"10px"}}>
                <input type="email" values={formValues.email ?? ""} onChange={(e)=>updateFormValue(e)} name="email" placeholder="Email"/>
                <input type="password" value={formValues.password ?? ""} onChange={(e)=>updateFormValue(e)} name="password" placeholder="Password"/>
                <input type="password" value={formValues.confirmPassword ?? ""} onChange={(e)=>updateFormValue(e)} name="confirmPassword" placeholder="Confirm Password" />
                <button type="submit">reset password</button>
            </form>
        </div>
    )
}