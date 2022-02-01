import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const Login = lazy(() => import('./loginForm'));
const Home = lazy(() => import('./homeForm'));

type Props = {};

const App = (props: Props) => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Suspense fallback={<h1>Loading...</h1>}><Login /></Suspense>}></Route>
                <Route path="/" element={<Suspense fallback={<h1>Loading...</h1>}><Login /></Suspense>}></Route>
                <Route path="/home" element={<Suspense fallback={<h1>Loading.....</h1>}><Home /></Suspense>}></Route>
            </Routes >
        </div >)
};

export default App;
