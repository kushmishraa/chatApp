import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../Slices/userSlice";
import { Link } from "react-router-dom";

export const SignupForm = ({formValues, updateFormValue, handleFormSubmit, emptyFormValues}) =>{
    const dispatch = useDispatch();
    const handleSignup = () =>{
        dispatch(registerUser(formValues));
    }
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', flexDirection:'column'}}>
            <form onSubmit={(e)=>handleFormSubmit(e,"signupForm", handleSignup )} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                <input type="text" value={formValues.name ?? ""} onChange={(e)=>updateFormValue(e)} name="name" placeholder="Name" />
                <input type="text" value={formValues.lastName ?? ""} onChange={(e)=>updateFormValue(e)} name="lastName" placeholder="Last Name" />
                <input type="text" value={formValues.userName ?? ""} onChange={(e)=>updateFormValue(e)} name="userName" placeholder="Username"/>
                <input type="password" value={formValues.password ?? ""} onChange={(e)=>updateFormValue(e)} name="password" placeholder="Password" />
                <input type="password" value={formValues.confirmPassword ?? ""} onChange={(e)=>updateFormValue(e)} name="confirmPassword" placeholder="Confirm password" />
                <input type="email" value={formValues.email ?? ""} onChange={(e)=>updateFormValue(e)} name="email" placeholder="Email" />
                <button type="submit">Submit</button>
            </form>
            <Link to="/login">
                <h3>Already have an account ?</h3>
            </Link>
        </div>
    )
}