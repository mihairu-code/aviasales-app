import './AsideFilter.less'
import FilterList from './FilterList/FilterList.jsx'

const AsideFilter = () => {
  const shouldWrap = window.innerWidth < 768 && window.innerWidth > 425

  return (
    <>
      {shouldWrap ? (
        <div className="wrapper">
          <aside className="aside-filter">
            <h1 className="filter-name">Количество пересадок</h1>
            <FilterList />
          </aside>
        </div>
      ) : (
        <aside className="aside-filter">
          <h1 className="filter-name">Количество пересадок</h1>
          <FilterList />
        </aside>
      )}
    </>
  )
}

export default AsideFilter
