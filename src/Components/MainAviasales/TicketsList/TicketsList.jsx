import './TicketsList.less'
import Ticket from "./Ticket/Ticket.jsx";


const TicketsList = () => {


    return (
        <section className="tickets-section">
            <ul className="tickets-list">
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
            </ul>
        </section>
    )
}

export default TicketsList