import React, { useState } from "react";

export const Login = () => {
    const [formValues, setFormValues] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    }

    const updateFormValue = (e) => {
        const tempFormValues = { ...formValues }
        console.log(e.target.value, e.target.name);
        if (e.target.value && e.target.name) {
            tempFormValues[e.target.name] = e.target.value;
            setFormValues(tempFormValues);
        }
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="User Name" value={formValues.username ? formValues.username : ""} onChange={(e) => updateFormValue(e)} name="username" />
                <input type="password" value={formValues.password ? formValues.password : ""} placeholder="Password" onChange={(e) => updateFormValue(e)} name="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}