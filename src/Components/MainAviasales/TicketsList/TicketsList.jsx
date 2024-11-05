import './TicketsList.less'
import Ticket from "./Ticket/Ticket.jsx";
import {useSelector} from "react-redux";

const TicketsList = () => {

    const tickets = useSelector(state => state.avia.tickets);

    return (
        <section className="tickets-section">
            <ul className="tickets-list">
                {tickets.map((ticket, index) => (<Ticket key={index} ticket={ticket} />))}
            </ul>
        </section>
    )
}

export default TicketsList