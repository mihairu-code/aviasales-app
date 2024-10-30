import './FilterRow.less'

const FilterRow = ({name, id}) => {

    return (
        <li className="filter-row" >
            <input className="filter-checkbox" id={id} type="checkbox"/>
            <label htmlFor={id}>{name}</label>
        </li>
    )
}

export default FilterRow