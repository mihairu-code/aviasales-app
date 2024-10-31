import TicketsArray from "../../configuration.js";
import './Aviasales.less'
import Logo from "../Logo/Logo.jsx";
import MainAviasales from "../MainAviasales/MainAviasales.jsx";
import AsideFilter from "../AsideFilter/AsideFilter.jsx";


const Aviasales = () => {



    return (
        <div className="aviasales">
            <Logo />
            <AsideFilter />
            <MainAviasales />
        </div>
    )
}

export default Aviasales