import { loginFormSchemaType, nameType, optionsType, _formDataType, _validationSchemaType } from 'loginForm';
import React from 'react';
import * as Yup from 'yup';
import { GenericField, SelectField } from '../FormElements';

export const initForm = (formSchema: loginFormSchemaType, setFormData: (arg0: _formDataType) => void, setValidationSchema: (arg0: any) => void) => {
    let _formData: _formDataType = {};
    let _validationSchema: _validationSchemaType = {};

    for (var key of Object.keys(formSchema)) {
        _formData[key] = "";

        if (formSchema[key].type === "password" || formSchema[key].type === "text") {
            _validationSchema[key] = Yup.string();
        } else if (formSchema[key].type === "email") {
            _validationSchema[key] = Yup.string().email()
        } else if (formSchema[key].type === "select") {
            _validationSchema[key] = Yup.string();
        } else if (formSchema[key].type === "a") {
            _validationSchema[key] = Yup.string().url();
        }

        if (formSchema[key].id === "confirmPassword") {
            _validationSchema[key] = Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match");
        }

        if (formSchema[key].required) {
            _validationSchema[key] = _validationSchema[key].required('This field is required');
        }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    //globalValidationSchema = Yup.object().shape({ ..._validationSchema });
}
export const getFormElement = (elementName: string, elementSchema: nameType & optionsType) => {
    const props = {
        type: elementSchema.type,
        name: elementName,
        label: elementSchema.label,
        placeholder: elementSchema.placeholder,
        options: elementSchema.options,
        className: elementSchema.className,
        onClick: elementSchema.onClick,
        id: elementSchema.id
    };


    if (elementSchema.type === "select") {
        return <SelectField  {...props} />
    }
    return (<GenericField {...props} />)


    /*else if (elementSchema.type === "submit") {
        return <GenericField {...props} />
    }*/

}