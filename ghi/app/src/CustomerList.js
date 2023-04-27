import React from "react";
import { useEffect, useState } from "react";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    async function updateCustomerList() {
        const customersUrl = "http://localhost:8090/api/customers/";
        const customersResponse = await fetch(customersUrl, {
            method: "GET"
        })
        if (customersResponse.ok) {
            const data = await customersResponse.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        updateCustomerList();
    }, []);

    return (
        <div className="container">
            <h3 className="p-3 text-center">Customers</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer =>
                        <tr key={customer.phone_number}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.address}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
