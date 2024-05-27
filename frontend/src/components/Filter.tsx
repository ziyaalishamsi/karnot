import React, { useState } from "react"
import './Filter.css'

const filters = ['All', 'declare', 'deploy', 'deploy_account', 'invoke', 'l1_handler']

const Filter: React.FC = () => {
    const [selected, setSelected] = useState('All')

    const changeHandler = (val: string) => {
        setSelected(val)
    }

    return <div className="filterBox">
        {filters.map(filter => <button
            className={`${selected === filter ? 'filterBtn--selected' : 'filterBtn'}`}
            onClick={changeHandler.bind(null, filter)}
        >{filter}</button>)}
    </div>
}

export default Filter