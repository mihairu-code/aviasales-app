import './MainAviasales.less'
import NavSort from './NavSort/NavSort.jsx'
import TicketsList from './TicketsList/TicketsList.jsx'

const MainAviasales = () => {
  return (
    <main className="main-avias">
      <NavSort />
      <TicketsList />
    </main>
  )
}

export default MainAviasales
