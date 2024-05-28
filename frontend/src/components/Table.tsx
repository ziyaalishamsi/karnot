import React from "react"
import './Table.css'
import { data, headers } from "./sampleData"

const Table: React.FC = () => {
    return <table>
        <tr>
            {headers.map((header) => <th>{header}</th> )}
        </tr>
        {data.map((el) => {
            return <tr className="dataRows">
                <td>{el.name}</td>
                <td>{el.calories}</td>
            </tr>
        })}
    </table>
}

export default Table