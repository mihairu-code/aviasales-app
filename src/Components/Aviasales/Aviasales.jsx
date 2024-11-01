import ticketsArray from "../../configuration.js";
import './Aviasales.less'
import Logo from "../Logo/Logo.jsx";
import MainAviasales from "../MainAviasales/MainAviasales.jsx";
import AsideFilter from "../AsideFilter/AsideFilter.jsx";
import {useState} from "react";



const Aviasales = () => {

    const ticketIds = ticketsArray.map((ticket, index) => {
        ticket.id = index;
        return ticket
    })

    return (
        <div className="aviasales">
            <Logo />
            <AsideFilter />
            <MainAviasales />
        </div>
    )
}

export default Aviasales