import './FilterRow.less'
import {useState} from "react";

const FilterRow = ({name, id, onClick}) => {
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {setChecked(prev => !prev);};

    return (
        <li className={`filter-row ${checked ? 'checked-bg' : '' }`}
            onClick={onClick}
        >
            <label className="filter-label" htmlFor={id}>
                <input className="filter-checkbox"
                       id={id} type="checkbox"
                       checked={checked}
                       onChange={handleChecked}
                />
                {name}
            </label>
        </li>
    )
}

export default FilterRow