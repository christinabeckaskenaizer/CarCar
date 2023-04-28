import React from "react";
import { useState, useEffect } from "react";

export default function SalesPersonHistory() {

    //state for dropdown list of salespersons
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState({});
    const [sales, setSales] = useState([]);
    const [filtered, setFiltered] = useState([]);


    async function salespersonsList() {
        const salespersonsUrl = "http://localhost:8090/api/salespeople/";
        const salespersonsResponse = await fetch(salespersonsUrl, { method: "GET" })
        if (salespersonsResponse.ok) {
            const data = await salespersonsResponse.json();
            setSalespeople(data.salespersons)
        }
    }

    function salesPersonChange(event) {
        const value = event.target.value;
        setSalesperson(value);


        const filteredSales = sales.filter(function (sale) {
            return value === sale.salesperson.employee_id;
        });

        setFiltered(filteredSales);


    }

    async function getSalesList() {
        const salesListUrl = "http://localhost:8090/api/sales/";
        const salesListResponse = await fetch(salesListUrl, { method: "GET" })
        if (salesListResponse.ok) {
            const data = await salesListResponse.json();
            setSales(data.sales);
        }
    }

    useEffect(() => {
        salespersonsList();
        getSalesList();
    }, []);


    return (
        <div className="row">
            <div>
                <h1 className="text-left">Salesperson History</h1>
                <select required onChange={salesPersonChange} id="salesperson" name="salesperson" className="form-select" value={salesperson}>
                    <option value="">Select a Salesperson</option>
                    {salespeople.map(salesperson => {
                        return (
                            <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                {salesperson.first_name} {salesperson.last_name}
                            </option>
                        )
                    })}
                </select>
                <div>
                    <table className="mt-4 table table-striped table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(sale =>
                                <tr key={sale.automobile.vin}>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}
