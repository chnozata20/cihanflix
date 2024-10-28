import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";
import BigSearchBar from "../components/BigSearchBar";

export default function Main() {
    const {} = useContext(MainContext);

    return (
        <React.Fragment><BigSearchBar /></React.Fragment>
    );
}
