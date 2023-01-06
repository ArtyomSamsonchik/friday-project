import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {PATH} from './app/App';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import NewPassword from "./components/NewPassword/NewPassword";
import RestorePassword from "./components/RestorePassword/RestorePassword";
import Test from "./components/Test/Test";
import store from "./app/store";
import {Provider} from "react-redux";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/friday-project" element={<App/>}>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.SIGN_UP} element={<SignUp/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
            <Route path={PATH.RESTORE_PASSWORD} element={<RestorePassword/>}/>
            <Route path={PATH.TEST} element={<Test/>}/>
            <Route path={PATH.ERROR} element={<ErrorPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Route>
    )
)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
)
