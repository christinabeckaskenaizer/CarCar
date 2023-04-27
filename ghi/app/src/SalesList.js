import React from "react";
import { useEffect, useState } from "react";

export default function SalesList() {

    const [sales, setSales] = useState([]);


    async function updateSalesList() {
        const salesListUrl = "http://localhost:8090/api/sales/";

        const salesListResponse = await fetch(salesListUrl, { method: "GET" })

        if (salesListResponse.ok) {
            const data = await salesListResponse.json();
            setSales(data.sales);
        }
    }
    useEffect(() => {
        updateSalesList();
    }, [])

    return (
        <div className="container">
            <h3 className="p-3 text-center">Sales</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Salesperson ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale =>
                        <tr key={sale.automobile.vin} id={sale.salesperson.employee_id}>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price.toLocaleString()}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
