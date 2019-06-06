import React from "react";
import { Link } from "react-router-dom";

export const Header = () => (
    <ul>
        <li>
            <Link to="/">Simuliacija</Link>
        </li>
        <li>
            <Link to="/submit">Pateikti</Link>
        </li>
    </ul>
);
