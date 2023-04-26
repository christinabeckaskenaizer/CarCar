import React from "react";
import { useState, useEffect } from "react";

export default function SalespeopleList() {

    const [salespersons, setSalespersons] = useState([]);

    async function updateSalespersonsList() {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url, { method: 'GET' })
        if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salespersons)
        }
    }

    useEffect(() => {
        updateSalespersonsList();
    }, []);


    return (
        <div className="container">
            <h3 className="p-3 text-center">Salespeople</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespersons.map(salesperson =>
                        <tr key={salesperson.employee_id} >
                            <td>{salesperson.employee_id}</td>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    )
}
