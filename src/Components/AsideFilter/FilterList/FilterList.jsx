import "./FilterList.less"
import FilterRow from "./FilterRow/FilterRow.jsx";

const FilterList = () => {
    const filters = [
        { id: 1, name: 'Все', stops : -1 },
        { id: 2, name: 'Без пересадок', stops : 0 },
        { id: 3, name: '1 пересадка', stops : 1 },
        { id: 4, name: '2 пересадки', stops : 2 },
        { id: 5, name: '3 пересадки', stops : 3 },
    ];

    return (
        <ul className="filter-list">
            {filters.map((filter) => (
                <FilterRow key={filter.id} i
                           d={filter.id}
                           name={filter.name}
                />
            ))}
        </ul>
    )
}

export default FilterList