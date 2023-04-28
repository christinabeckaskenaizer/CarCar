import React from "react";
import { useState, useEffect } from "react";

export default function AutomobileList() {

    const [autos, setAutos] = useState([]);

    useEffect(() => {
        updateList();
    }, []);


    async function updateList() {

        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url, { method: 'GET' })
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    }



    return (
        <div className="container">
            <h3 className="p-3 text-center">Automobiles</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(automobile =>
                        <tr key={automobile.id} >
                            <td>{automobile.vin}</td>
                            <td>{automobile.color}</td>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.name}</td>
                            <td>{automobile.model.manufacturer.name}</td>
                            <td>{automobile.sold ? "Yes" : "No"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    )
}
