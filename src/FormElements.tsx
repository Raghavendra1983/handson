import './App.css';

import React, { useCallback } from 'react';
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,

    useFormik,
    FormikProps
} from 'formik';
import { func } from 'prop-types';


export function Form(props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) {
    return (
        <Formik
            {...props}>
            {({ isValid, dirty, errors, isSubmitting }) => (
                <FormikForm className="needs-validation" >
                    {errors.serverError && (
                        <p className="text-center text-red-500 text-lg">
                            {errors.serverError}
                        </p>
                    )}
                    {props.children}
                </FormikForm>
            )}
        </Formik>
    )
};


export function TextField(props: { [x: string]: any; name: any; label: any; placeholder: any; }) {
    const { name, label, placeholder, ...rest } = props;
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""}
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

export function SelectField(props: { name: any; label: any; options: any; }) {
    const { name, label, options } = props
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                as="select"
                id={name}
                name={name}
            >
                <option value="" >Choose...</option>
                {options.map((optn: { code: string | number | readonly string[] | undefined; name: any; }, index: any) => <option value={optn.code} label={optn.name || optn.code} />)}
            </Field>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

export function SubmitButton(props: { [x: string]: any; title: any; }) {
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();

    return (
        <button type="submit" {...rest} disabled={isSubmitting}>{title}</button>
    )
}
export const GenericField = (props: { [x: string]: any; type: any; name: any; label: any; placeholder: any; options: any; href: any }) => {
    const { type, name, label, className, href } = props;
    console.log(props);
    const { isValid } = useFormikContext();
    const val = (type === "button" || type === "submit") ? label : undefined;

    return (
        <>
            {(!val && label && type !== "a") && <label htmlFor={name}>{label}</label>}
            {(type === "a" && href) && <a href={href}>{label}</a>}
            {(type === "a" && !href) && <a href="#">{label}</a>}


            {(!val) && type !== "a" && (
                <Field
                    id={name}
                    className={className}
                    {...props}
                ></Field>)
            }
            {(val) && type !== "a" && (
                <Field
                    id={name}
                    value={val}
                    disabled={!isValid}
                    className={(isValid) ? className : "btn-disabled"}
                    {...props}
                ></Field>)
            }
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
};
