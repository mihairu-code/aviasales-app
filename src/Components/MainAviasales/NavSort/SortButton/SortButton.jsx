import './SortButton.less'
import { useDispatch, useSelector } from 'react-redux'

import { setSort } from '../../../../store/aviaSlices.js'

const SortButton = ({ name }) => {
  const dispatch = useDispatch()
  const currentSort = useSelector((state) => state.avia.sort)
  const handleSortClick = () => {
    dispatch(setSort(name))
  }

  return (
    <button
      className={`sort-button ${currentSort === name ? 'active' : ''}`}
      onClick={handleSortClick}
    >
      {name}
    </button>
  )
}

export default SortButton
