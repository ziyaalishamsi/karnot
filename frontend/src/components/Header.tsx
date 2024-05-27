import React from "react"
import './Header.css'

const Header: React.FC = () => {
    return <div>
        <h3 className="title">Transactions</h3>
        <p className="subtitle">A list of transactions on Starknet</p>
    </div>
}   

export default Header