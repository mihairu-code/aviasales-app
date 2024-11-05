import './TicketLine.less'
import {useSelector} from "react-redux";

const TicketLine = ({ price, carrier, from, to }) => {
    const counter = {
        0: "БЕЗ ПЕРЕСАДОК",
        1: "1 ПЕРЕСАДКА",
        2: "2 ПЕРЕСАДКИ",
        3: "3 ПЕРЕСАДКИ",
        4: "4 ПЕРЕСАДКИ",
        5: "5 ПЕРЕСАДОК",
    }

    const convertMinutes = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}ч ${remainingMinutes}м`;
    };

    const fly = (data, duration) => {
        const date = new Date(data);
        if (duration) {
            date.setUTCMinutes(date.getUTCMinutes() + duration);
        }
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (

        <section className="ticket-line">
            {price ? (
                <>
                    <span className="left">{price.toLocaleString('ru-RU').replace(/,/g, ' ') + ' Р'}</span>
                    <span className="center"></span>
                    <img className="end" src={carrier} alt="Logo"/>
                </>
            ) : to ? (
                <>
                    <span className="left" data-info={to.origin+" - "+to.destination}>{fly(to.date)+" - "+fly(to.date, to.duration)}</span>
                    <span className="center" data-info="В ПУТИ">{convertMinutes(to.duration)}</span>
                    <span className="right" data-info={counter[to.stops.length]}>{to.stops.map((el, index) => { return el + (index < to.stops.length - 1 ? ', ' : ''); }).join('')}</span>
                </>
            ) : from ? (
                <>
                    <span className="left"
                          data-info={from.origin+" - "+from.destination}>{fly(from.date)+" - "+fly(from.date, from.duration)}</span>
                    <span className="center" data-info="В ПУТИ">{convertMinutes(from.duration)}</span>
                    <span className="right" data-info={counter[from.stops.length]}>{from.stops.map((el, index) => {
                        return el + (index < from.stops.length - 1 ? ', ' : '');
                    }).join('')}</span>
                </>
            ) : null}
        </section>

    )
}

export default TicketLine;