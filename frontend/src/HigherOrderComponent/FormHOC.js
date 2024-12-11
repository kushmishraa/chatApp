import React from "react";
import { useState } from "react";

export const FormHoc = (WrappedComponent) =>{
   return function HOCForm (props) {
    const [formValues, setFormValues] = useState({});

    const handleFormSubmit = (e, formName, callback) => {
        callback && callback();
        e.preventDefault();
    }

    const emptyFormValues = () =>{
        setFormValues({});
    }

    const updateFormValue = (e) => {
        const tempFormValues = { ...formValues }
        console.log(e.target.value, e.target.name);    
            tempFormValues[e.target.name] = e.target.value;
            setFormValues(tempFormValues);
    }
    return(
        <WrappedComponent 
            formValues={formValues}
            updateFormValue={updateFormValue} 
            handleFormSubmit={handleFormSubmit} 
            emptyFormValues={emptyFormValues}
        />
    )
    }
}