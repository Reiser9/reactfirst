import React from 'react';
import './form.css';
import {Field} from 'redux-form';

export const FormControl = ({input, meta: {touched, error}, child, ...props}) => {
    const hasError = touched && error;
    return(
        <div className={"profile__add--textarea form__inner " + (hasError ? "form__input--error" : "")}>
            {props.children}

            {hasError && <div className="form__error">{error}</div>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const CreateFields = (component, name, type, placeholder, validate, classes) => {
    return(
        <Field component={component} name={name} type={type} placeholder={placeholder} validate={validate} className={classes}/>
    )
}