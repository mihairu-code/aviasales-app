import { useDispatch, useSelector } from 'react-redux'

import { setFilter, setAllFilters } from '../../../store/aviaSlices.js'

import './FilterList.less'
import FilterRow from './FilterRow/FilterRow.jsx'

const FilterList = () => {
  const dispatch = useDispatch()
  const { filters, allFilters } = useSelector((state) => state.avia)

  const filterData = [
    { id: 'all', name: 'Все' },
    { id: 0, name: 'Без пересадок', stops: 0 },
    { id: 1, name: '1 пересадка', stops: 1 },
    { id: 2, name: '2 пересадки', stops: 2 },
    { id: 3, name: '3 пересадки', stops: 3 },
  ]

  const handleFilterChange = (id) => {
    dispatch(setFilter(id))
  }

  const handleAllFiltersChange = () => {
    dispatch(setAllFilters())
  }

  return (
    <ul className="filter-list">
      {filterData.map((filter) => (
        <FilterRow
          key={filter.id}
          id={filter.id}
          name={filter.name}
          checked={
            filter.id === 'all' ? allFilters : filters.includes(filter.id)
          }
          onChange={
            filter.id === 'all'
              ? handleAllFiltersChange
              : () => handleFilterChange(filter.id)
          }
        />
      ))}
    </ul>
  )
}

export default FilterList
