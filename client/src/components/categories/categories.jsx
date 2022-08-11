import { useState } from "react"


function Categories() {
    const [activeCategories, setActiveCategories] = useState(0)
    const onClickCategory = (index) => {
        setActiveCategories(index)
    }

    return (
        <div className="categories">
            <ul>
                <li onClick={() => onClickCategory(0)} className={activeCategories === 0 ? "active" : ""}>Все</li>
                <li onClick={() => onClickCategory(1)} className={activeCategories === 1 ? "active" : ""}>Мясные</li>
                <li onClick={() => onClickCategory(2)} className={activeCategories === 2 ? "active" : ""}>Вегетарианская</li>
                <li onClick={() => onClickCategory(3)} className={activeCategories === 3 ? "active" : ""}>Гриль</li>
                <li onClick={() => onClickCategory(4)} className={activeCategories === 4 ? "active" : ""}>Острые</li>
                <li onClick={() => onClickCategory(5)} className={activeCategories === 5 ? "active" : ""}>Закрытые</li>
            </ul>
        </div>
    )
}

export default Categories