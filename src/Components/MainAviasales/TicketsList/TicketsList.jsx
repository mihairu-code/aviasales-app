import './TicketsList.less';
import Ticket from "./Ticket/Ticket.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setVisibledTickets } from "../../../store/aviaSlices.js";
import { useEffect } from "react";
import { fetchTickets } from "../../../store/aviaSlices.js";
import load from "./loadwebm.webm"

const TicketsList = () => {
    const { tickets, loading, error } = useSelector(state => state.avia);
    const visibledTickets = useSelector(state => state.avia.visibledTickets);
    const sort = useSelector(state => state.avia.sort);
    const filters = useSelector(state => state.avia.filters);
    const dispatch = useDispatch();

    // Запуск загрузки билетов при монтировании компонента
    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    const showMoreTickets = () => {
        dispatch(setVisibledTickets(visibledTickets + 5));
    };

    // Фильтрация билетов на основе выбранных фильтров
    const filteredTickets = Array.isArray(tickets) ? tickets.filter(ticket => {
        if (filters.length === 0) return true;
        return filters.includes(ticket.segments[0].stops.length);
    }) : [];

    // Сортировка билетов по выбранному параметру
    const sortedTickets = filteredTickets.sort((a, b) => {
        if (sort === 'Самый быстрый') {
            return a.segments[0].duration - b.segments[0].duration;
        }
        if (sort === 'Самый дешевый') {
            return a.price - b.price;
        }
        return 0;
    });

    // Отображение ошибки и кнопки для повторного запроса при неудачной загрузке
    if (error) {
        return (
            <section className="tickets-section">
                <p>Произошла ошибка при загрузке билетов: {error}</p>
                <button className="reload-button" onClick={() => dispatch(fetchTickets())}>Повторить загрузку</button>
            </section>
        );
    }

    return (
        <section className="tickets-section">
            {
                loading ? <video className="loading-animation" src={load} autoPlay loop muted/> :
                    <ul className="tickets-list">
                        {sortedTickets.slice(0, visibledTickets).map((ticket, index) => (
                            <Ticket key={index} ticket={ticket} />
                        ))}
                    </ul>
            }
            {visibledTickets < sortedTickets.length && (
                <button className="show-more-button" onClick={showMoreTickets}>
                    Показать еще
                </button>
            )}
        </section>
    );
};

export default TicketsList;
