import React, { useState, useEffect, useRef, useReducer } from 'react';
import { useForm } from "react-hook-form";
import './App.css';
import { Form, TextField, SelectField, SubmitButton, GenericField } from './FormElements';
import * as Yup from 'yup';
import axiosInstance from '../utils/axios';
import { LoginInitValuesType } from '../types/authTypes';
import Error from './component/errorComponent';
import loginReducer, { initialState } from 'reducers/loginReducer';
import { Formik, replace, validateYupSchema } from 'formik';
import { useNavigate } from 'react-router-dom';
import { initForm, getFormElement } from 'utils/formUtils';

export interface nameType {
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    className?: string,
    onClick?: () => void
}
export interface optionsObjectType {
    label?: string;
    value?: string;
    name?: string;
    code?: string
}
export interface optionsType {
    options?: optionsObjectType[]
}
export interface loginFormSchemaType {
    [key: string]: (nameType & optionsType)
}


export interface _formDataType {
    [key: string]: string
}
export interface _validationSchemaType {
    [key: string]: Yup.StringSchema;

}
function Login(): JSX.Element {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [state, dispatch] = useReducer(loginReducer, initialState);
    const navigate = useNavigate();

    const loginFormSchema: loginFormSchemaType = {
        email: {
            type: "email",
            label: "Email",
            placeholder: "Enter your email address",
            required: true,
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        },
        password: {
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            required: true,
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        },
        /*role: {
            type: "select",
            label: "Role",
            required: true,
            placeholder: "Select one",
            options: [
                {
                    label: "Admin",
                    value: "admin"
                },
                {
                    label: "User",
                    value: "user"
                }
            ]
        },*/
        button: {
            type: "submit",
            label: "Submit",
            placeholder: "",
            className: 'btn-primary',
            //disabledClassName: 'btn-disabled',
            required: false
        },
        input: {
            type: "button",
            label: "Clear error",
            placeholder: "",
            required: false,
            className: 'btn-secondary',
            onClick: () => setErrorMessage('')

        }
    }
    useEffect(() => {
        initForm(loginFormSchema, setFormData, setValidationSchema);
    }, []);





    const onLogin = async (values: any, { setSubmitting, resetForm, setStatus }: any) => {
        setErrorMessage('');
        const { remember_me, serverError, ...rest } = values;
        try {
            const res = await axiosInstance.post('login', rest);
            const user = JSON.stringify(res.data.user);
            const token = await res.data.accessToken;
            const payload = {
                user: user,
                token: token
            }
            dispatch({ type: 'LOGIN_SUCCESS', payload });
            navigate('/home', { replace: true });
        }
        catch (error) {
            //console.log(error);
            //showError.message = 'error';
            setErrorMessage(String(error));
        }
    }

    return (
        <div className="flex flex-wrap -mx-1 bg-white rounded-lg justify-center shadow-2xl w-full">

            <Form

                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onLogin}
            >
                <>
                    {errorMessage && <Error message={errorMessage} />}

                    {Object.keys(loginFormSchema).map((key, ind) => (
                        <div key={key}>
                            {getFormElement(key, loginFormSchema[key])}
                        </div>

                    ))}

                </>
            </Form>

        </div>
    );
}

export default Login;