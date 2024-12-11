import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateuser } from "../Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const LoginForm = ({ formValues, updateFormValue, handleFormSubmit }) => {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.user.loggedInUser);
    const dispatch = useDispatch();
    const callbackValidateUser = () => {
        dispatch(validateuser(formValues));
    }

    useEffect(() => {
        if (loggedInUser?._id) {
            navigate("/");
        }
    }, [loggedInUser])

    return (
        <div>
            <form onSubmit={(e) => handleFormSubmit(e, "loginForm", callbackValidateUser)} style={{ display: 'flex', flexDirection: 'column', gap: "10px" }}>
                <input type="text" placeholder="Enter your username" value={formValues.username} onChange={(e) => updateFormValue(e)} name="username" />
                <input type="password" placeholder="Enter your password" value={formValues.password} onChange={(e) => updateFormValue(e)} name="password" />
                <button type="submit">Login</button>
            </form>
            <Link to="/signup">
                <h3>Don't have an account ?</h3>
            </Link>
            <Link to="/forget">
                <h3>forget your password ?</h3>
            </Link>
        </div>
    )
}