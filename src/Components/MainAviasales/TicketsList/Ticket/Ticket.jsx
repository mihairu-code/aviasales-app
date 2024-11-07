import './Ticket.less'
import TicketLine from './TicketLine/TicketLine.jsx'

const Ticket = ({ ticket }) => {
  let carrier = `//pics.avs.io/99/36/${ticket.carrier}.png`
  let price = ticket.price
  let [to, from] = ticket.segments

  return (
    <li className="ticket">
      <TicketLine price={price} carrier={carrier} />
      <TicketLine to={to} />
      <TicketLine from={from} />
    </li>
  )
}

export default Ticket
