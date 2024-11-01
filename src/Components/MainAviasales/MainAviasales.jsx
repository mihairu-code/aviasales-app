import "./MainAviasales.less"
import NavSort from "./NavSort/NavSort.jsx";
import TicketsList from "./TicketsList/TicketsList.jsx";
import ShowMoreButton from "./ShowMoreButton/ShowMoreButton.jsx";


const MainAviasales = () => {

    return (
        <main className="main-avias">
            <NavSort />
            <TicketsList />
            <ShowMoreButton />
        </main>
    )
}

export default MainAviasales