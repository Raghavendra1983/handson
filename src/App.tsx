import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import * as Yup from 'yup';
const Login = lazy(() => import('./loginForm'));
const Home = lazy(() => import('./homeForm'));
const Register = lazy(() => import('./registerForm'));
type Props = {};

const App = (props: Props) => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Suspense fallback={<h1>Loading...</h1>}><Login /></Suspense>}></Route>
                <Route path="/" element={<Suspense fallback={<h1>Loading...</h1>}><Login /></Suspense>}></Route>
                <Route path="/home" element={<Suspense fallback={<h1>Loading.....</h1>}><Home /></Suspense>}></Route>
                <Route path="/register" element={<Suspense fallback={<h1>Loading......</h1>}><Register /></Suspense>}></Route>
            </Routes >
        </div >)
};

export default App;/*
const initialValues = {
    email: "",
    password: ""
};
const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
        .required("Password is required")
        .min(4, "Password is too short - should be 4 chars minimum"),
});

const App = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik;
                return (
                    <div className="container">
                        <h1>Sign in to continue</h1>
                        <Form>
                            <div className="form-row">
                                <label htmlFor="email">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={errors.email && touched.email ?
                                        "input-error" : null}
                                />
                                <ErrorMessage name="email" component="span" className="error" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={errors.password && touched.password ?
                                        "input-error" : null}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="span"
                                    className="error"
                                />
                            </div>

                            <button
                                type="submit"
                                className={!(dirty && isValid) ? "disabled-btn" : ""}

                            >
                                Sign In
                            </button>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};
export default App;*/