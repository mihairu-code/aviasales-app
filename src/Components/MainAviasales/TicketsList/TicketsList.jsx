import './TicketsList.less'
import Ticket from "./Ticket/Ticket.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setVisibledTickets} from "../../../store/aviaSlices.js";

const TicketsList = () => {

    const tickets = useSelector(state => state.avia.tickets);
    const visibledTickets = useSelector(state => state.avia.visibledTickets)
    const dispatch = useDispatch();

    const showMoreTickets = () => {
        dispatch(setVisibledTickets(visibledTickets + 5));
    };

    return (
        <section className="tickets-section">
            <ul className="tickets-list">
                {tickets.slice(0, visibledTickets).map((ticket, index) => (<Ticket key={index} ticket={ticket}/>))}
            </ul>
            <button className="show-more-button" onClick={showMoreTickets}>Показать еще</button>
        </section>
    )
}

export default TicketsList