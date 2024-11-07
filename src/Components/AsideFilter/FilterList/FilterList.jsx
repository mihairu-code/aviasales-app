import './FilterList.less'
import FilterRow from './FilterRow/FilterRow.jsx'

const FilterList = () => {
  const filters = [
    { id: 'all', name: 'Все' }, // добавляем фильтр "Все"
    { id: 0, name: 'Без пересадок', stops: 0 },
    { id: 1, name: '1 пересадка', stops: 1 },
    { id: 2, name: '2 пересадки', stops: 2 },
    { id: 3, name: '3 пересадки', stops: 3 },
  ]

  return (
    <ul className="filter-list">
      {filters.map((filter) => (
        <FilterRow key={filter.id} id={filter.id} name={filter.name} />
      ))}
    </ul>
  )
}

export default FilterList
