import React from 'react';
import s from "./App.module.css";
import Header from "../components/Header/Header";
import {Outlet} from "react-router-dom";

const App = () => {
    return (
        <div className={s.app}>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default App
