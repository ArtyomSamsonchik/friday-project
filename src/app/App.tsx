import React from 'react';
import s from "./App.module.css";
import Header from "../components/Header/Header";
import {Outlet} from "react-router-dom";

export const PATH = {
    LOGIN: "login",
    SIGN_UP: "signup",
    PROFILE: "profile",
    ERROR: "404",
    NEW_PASSWORD: "new-password",
    RESTORE_PASSWORD: "restore-password",
    TEST: "test",
}

const App = () => {
    return (
        <div className={s.app}>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default App
