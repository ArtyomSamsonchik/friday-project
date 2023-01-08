import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../app/path";
import s from "./Header.module.css";

const Header = () => {
    const links = Object.entries(PATH).map(([name, path], i) => {
        name = name.replace("_", " ").toLowerCase()
        return (
            <li key={"link" + i}>
                <NavLink
                    to={path}
                    className={({isActive}) => `${s.link} ${isActive ? s.active : ""}`}
                >
                    {name}
                </NavLink>
            </li>
        )
    })

    return (
        <div>
            <ul className={s.links_list}>{links}</ul>
        </div>
    )
}

export default Header