import './NavSort.less'
import SortButton from "./SortButton/SortButton.jsx";

const NavSort = () => {
    const sortSettings =    [{id: 1, name: 'Самый дешевый'},
                                                    {id: 2, name: 'Самый быстрый'},
                                                    {id: 3, name: 'Оптимальный'}]



    return (
        <nav className="nav-sort">
            {sortSettings.map(setting => (
                <SortButton key={setting.id} name={setting.name} />
            ))}
        </nav>
    )
}

export default NavSort