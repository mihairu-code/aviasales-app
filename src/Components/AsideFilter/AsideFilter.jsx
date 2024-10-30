import "./AsideFilter.less"
import FilterList from "./FilterList/FilterList.jsx";

const AsideFilter = () => {

    return (
        <aside className="aside-filter">
            <h1 className="filter-name">Количество пересадок</h1>
            <FilterList />
        </aside>
    )
}

export default AsideFilter;