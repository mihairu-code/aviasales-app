import './Ticket.less'
import TicketLine from "./TicketLine/TicketLine.jsx";

const Ticket = () => {
    return (
        <li className="ticket">
            <TicketLine  />
            <TicketLine />
            <TicketLine />
        </li>
    )
}

export default Ticket