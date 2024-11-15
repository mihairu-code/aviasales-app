import './TicketsList.less'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'

import { setVisibledTickets, fetchTickets } from '../../../store/aviaSlices.js'

import Ticket from './Ticket/Ticket.jsx'
import load from './loadwebm.webm'

const TicketsList = () => {
  const { tickets, loading, error } = useSelector((state) => state.avia)
  const visibledTickets = useSelector((state) => state.avia.visibledTickets)
  const sort = useSelector((state) => state.avia.sort)
  const filters = useSelector((state) => state.avia.filters)
  const dispatch = useDispatch()

  // Начать загрузку билетов при монтировании компонента
  useEffect(() => {
    if (tickets.length === 0) {
      dispatch(fetchTickets())
    }
  }, [dispatch, tickets.length])

  const showMoreTickets = () => {
    dispatch(setVisibledTickets(visibledTickets + 5))
  }

  // Отфильтрованные и отсортированные билеты
  const filteredTickets = useMemo(() => {
    return Array.isArray(tickets)
      ? tickets.filter((ticket) => {
          if (filters.length === 0) return true
          return filters.includes(ticket.segments[0].stops.length)
        })
      : []
  }, [tickets, filters])

  const sortedTickets = useMemo(() => {
    return filteredTickets.sort((a, b) => {
      if (sort === 'Самый быстрый') {
        return a.segments[0].duration - b.segments[0].duration
      }
      if (sort === 'Самый дешевый') {
        return a.price - b.price
      }
      return 0
    })
  }, [filteredTickets, sort])

  const noSelectedFilters = filters.length === 0
  const noTicketsFound = !loading && sortedTickets.length === 0

  if (error) {
    return (
      <section className="tickets-section">
        <p>Произошла ошибка при загрузке билетов: {error}</p>
        <button
          className="reload-button"
          onClick={() => dispatch(fetchTickets())}
        >
          Повторить загрузку
        </button>
      </section>
    )
  }

  return (
    <section className="tickets-section">
      {loading && tickets.length === 0 ? (
        <video className="loading-animation" src={load} autoPlay loop muted />
      ) : noTicketsFound ? (
        <div className="tickets-section__none-tickets none-tickets">
          <p className="none-tickets__text">
            По таким настройкам билетов не найдено.
          </p>
          <video className="just-pic" src={load} autoPlay loop muted />
        </div>
      ) : (
        <>
          <ul className="tickets-list">
            {sortedTickets.slice(0, visibledTickets).map((ticket, index) => (
              <Ticket key={index} ticket={ticket} />
            ))}
          </ul>
          {sortedTickets.length > visibledTickets && (
            <button className="show-more-button" onClick={showMoreTickets}>
              Показать еще
            </button>
          )}
        </>
      )}
    </section>
  )
}

export default TicketsList
