import React, { useState, useEffect, useRef, useReducer } from 'react';
import { useForm } from "react-hook-form";
import './App.css';
import { Form, TextField, SelectField, SubmitButton, GenericField } from './FormElements';
import * as Yup from 'yup';
import axiosInstance from '../utils/axios';
import { LoginInitValuesType } from '../types/authTypes';
import Error from './component/errorComponent';
import loginReducer from 'reducers/loginReducer';
import { Formik, validateYupSchema } from 'formik';

interface nameType {
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    className?: string
}
interface optionsObjectType {
    label: string;
    value: string;
}
interface optionsType {
    options?: optionsObjectType[]
}
interface loginFormSchemaType {
    [key: string]: (nameType & optionsType)
}

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
    }
}
interface _formDataType {
    [key: string]: string
}
interface _validationSchemaType {
    [key: string]: Yup.StringSchema;

}
function Login(): JSX.Element {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const { register, formState: { errors }, handleSubmit, clearErrors } = useForm();

    useEffect(() => {
        initForm(loginFormSchema);
    }, []);

    const initForm = (formSchema: loginFormSchemaType) => {
        let _formData: _formDataType = {};
        let _validationSchema: _validationSchemaType = {};

        for (var key of Object.keys(formSchema)) {
            _formData[key] = "";

            if (formSchema[key].type === "password") {
                _validationSchema[key] = Yup.string();
            } else if (formSchema[key].type === "email") {
                _validationSchema[key] = Yup.string().email()
            } /*else if (formSchema[key].type === "select") {
                _validationSchema[key] = Yup.string().oneOf((formSchema[key]).options.map(o => o.value));
            }*/

            if (formSchema[key].required) {
                _validationSchema[key] = _validationSchema[key].required('This field is required');
            }
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
        //globalValidationSchema = Yup.object().shape({ ..._validationSchema });
    }

    const getFormElement = (elementName: string, elementSchema: nameType & optionsType) => {
        const props = {
            type: elementSchema.type,
            name: elementName,
            label: elementSchema.label,
            placeholder: elementSchema.placeholder,
            options: elementSchema.options,
            className: elementSchema.className,

        };

        if (elementSchema.type === "password" || elementSchema.type === "email") {
            //console.log(props);
            //return <TextField placeholder={elementSchema.placeholder} {...props} />
            return (<GenericField {...props} />)
        }

        if (elementSchema.type === "select") {
            return <SelectField  {...props} />
        }
        else if (elementSchema.type === "submit") {
            return <GenericField {...props} />
        }

    }

    const onLogin = async (values: any, { setSubmitting, resetForm, setStatus }: any) => {
        setErrorMessage('');
        const { remember_me, serverError, ...rest } = values;
        try {
            const res = await axiosInstance.post<LoginInitValuesType>('login', rest);
            console.log(res);
        }
        catch (error) {
            //console.log(error);
            //showError.message = 'error';
            setErrorMessage(String(error));
        }
    }

    return (
        <div className="flex flex-wrap -mx-1 bg-white rounded-lg justify-center shadow-2xl w-full" onClick={() => setErrorMessage('')}>

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