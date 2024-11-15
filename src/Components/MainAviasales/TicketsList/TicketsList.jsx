import './TicketsList.less'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'

import {
  setVisibledTickets,
  fetchTickets,
  setAllFilters,
  setFilter,
} from '../../../store/aviaSlices.js'

import Ticket from './Ticket/Ticket.jsx'
import load from './loadwebm.webm'

const TicketsList = () => {
  const { tickets, loading, error } = useSelector((state) => state.avia)
  const visibledTickets = useSelector((state) => state.avia.visibledTickets)
  const sort = useSelector((state) => state.avia.sort)
  const filters = useSelector((state) => state.avia.filters)
  const dispatch = useDispatch()

  const handleChecked = (event) => {
    event.stopPropagation()
    if (name === 'Все') {
      dispatch(setAllFilters())
      return
    }
    dispatch(setFilter(id))
  }

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

  if (noSelectedFilters) {
    return (
      <div className="tickets-section__none-tickets none-tickets">
        <p className="none-tickets__text">
          По таким настройкам билетов не найдено.
        </p>
        <video className="just-pic" src={load} autoPlay loop muted />
      </div>
    )
  }

  return (
    <section className="tickets-section">
      {loading && (
        <video className="loading-animation" src={load} autoPlay loop muted />
      )}
      {error ? (
        <section className="tickets-section">
          <p>Произошла ошибка при загрузке билетов: {error}</p>
          <button
            className="reload-button"
            onClick={() => dispatch(fetchTickets())}
          >
            Повторить загрузку
          </button>
        </section>
      ) : (
        <>
          <ul className={`tickets-list ${loading ? 'translateY' : ''}`}>
            {sortedTickets.slice(0, visibledTickets).map((ticket, index) => (
              <Ticket key={index} ticket={ticket} />
            ))}
          </ul>
          <button className="show-more-button" onClick={showMoreTickets}>
            Показать еще
          </button>
        </>
      )}
    </section>
  )
}

export default TicketsList
