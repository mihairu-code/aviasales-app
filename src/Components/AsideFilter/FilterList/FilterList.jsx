import "./FilterList.less"
import FilterRow from "./FilterRow/FilterRow.jsx";

const FilterList = () => {
    const filters = [
        { id: 1, name: 'Все' },
        { id: 2, name: 'Без пересадок' },
        { id: 3, name: '1 пересадка' },
        { id: 4, name: '2 пересадки' },
        { id: 5, name: '3 пересадки' },
    ];

    return (
        <ul className="filter-list">
            {filters.map((filter) => (
                <FilterRow key={filter.id} id={filter.id} name={filter.name} />
            ))}
        </ul>
    )
}

export default FilterList