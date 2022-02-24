import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useCallback } from "react";

const useFormUtils = () => {
    const GenericField = useCallback((props: { [x: string]: any; type: any; name: any; label: any; placeholder: any; options: any; href: any }) => {
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
    }, []);
}
export default useFormUtils;