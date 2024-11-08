import './FilterRow.less'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setAllFilters, setFilter } from '../../../../store/aviaSlices.js'

const FilterRow = ({ name, id }) => {
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.avia.filters)
  const allFilters = useSelector((state) => state.avia.allFilters)

  const handleChecked = () => {
    if (name === 'Все') {
      dispatch(setAllFilters())
    } else {
      setChecked((prev) => !prev)
      dispatch(setFilter(id))
    }
  }

  const isChecked = name === 'Все' ? allFilters : filters.includes(id)

  return (
    <li
      className={`filter-row ${isChecked ? 'checked-bg' : ''}`}
      onClick={handleChecked}
    >
      <label className="filter-label" htmlFor={id}>
        <input
          className="filter-checkbox"
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={handleChecked}
        />
        {name}
      </label>
    </li>
  )
}
export default FilterRow
