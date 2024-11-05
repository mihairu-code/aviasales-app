import './TicketsList.less'
import Ticket from "./Ticket/Ticket.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setVisibledTickets} from "../../../store/aviaSlices.js";

const TicketsList = () => {

    const tickets = useSelector(state => state.avia.tickets);
    const visibledTickets = useSelector(state => state.avia.visibledTickets)
    const sort = useSelector(state => state.avia.sort);
    const filters = useSelector(state => state.avia.filters);
    const dispatch = useDispatch();

    const showMoreTickets = () => {
        dispatch(setVisibledTickets(visibledTickets + 5));
    };

    const filteredTickets = tickets.filter(ticket => {
        if (filters.length === 0) return true; // Если нет фильтров, показываем все билеты
        return filters.includes(ticket.segments[0].stops.length); // Фильтруем по количеству пересадок
    });

    const sortedTickets = filteredTickets.sort((a, b) => {
        if (sort === 'Самый быстрый') {
            return a.segments[0].duration - b.segments[0].duration; // Сортировка по времени
        }
        if (sort === 'Самый дешевый') {
            return a.price - b.price; // Сортировка по цене
        }
        return 0; // Без изменений
    });

    return (
        <section className="tickets-section">
            <ul className="tickets-list">
                {sortedTickets.slice(0, visibledTickets).map((ticket, index) => (<Ticket key={index} ticket={ticket}/>))}
            </ul>
            {visibledTickets < sortedTickets.length && (
                <button className="show-more-button" onClick={showMoreTickets}>
                    Показать еще
                </button>
            )}
        </section>
    )
}

export default TicketsList