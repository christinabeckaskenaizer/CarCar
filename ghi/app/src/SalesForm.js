import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SalesForm() {

    const [automobile, setAutomobile] = useState(false);
    const [autos, setAutos] = useState([]);
    const [salesperson, setSalesperson] = useState(false);
    const [salespersons, setSalespersons] = useState([]);
    const [customer, setCustomer] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [price, setPrice] = useState('');

    const navigate = useNavigate();

    function automobileChange(event) {
        const value = event.target.value;
        setAutomobile(value);
    }

    function salespersonChange(event) {
        const value = event.target.value;
        setSalesperson(value);
    }

    function customerChange(event) {
        const value = event.target.value;
        setCustomer(value);
    }

    function priceChange(event) {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;
        console.log(data);
        console.log(customer);

        const salesListUrl = "http://localhost:8090/api/sales/";
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const salesListResponse = await fetch(salesListUrl, config);
        if (salesListResponse.ok) {
            const newSale = await salesListResponse.json();

            setAutos([]);
            setSalespersons([]);
            setCustomers([]);
            setPrice('');
            alert("Sale has been recorded!");

            navigate("/sales");

        } else {
            alert("Unable to create sale!");
        }

    }

    async function fetchAutoData() {
        const automobileResponse = await fetch("http://localhost:8100/api/automobiles/");
        const automobileData = await automobileResponse.json();
        if (automobileResponse.ok) {
            setAutos(automobileData.autos.filter(function (auto) {
                return auto.sold === false;
            }));
        }
    }

    async function fetchSalesPersonData() {
        const salesPersonResponse = await fetch("http://localhost:8090/api/salespeople/");
        const salesPersonData = await salesPersonResponse.json();
        if (salesPersonResponse.ok) {
            setSalespersons(salesPersonData.salespersons);
        }
    }

    async function fetchCustomerData() {
        const customerResponse = await fetch("http://localhost:8090/api/customers/");
        const customerData = await customerResponse.json();
        if (customerResponse.ok) {
            setCustomers(customerData.customers);
        }
    }

    useEffect(() => {
        fetchAutoData();
        fetchSalesPersonData();
        fetchCustomerData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="mb-3">
                            <select required onChange={automobileChange} id="automobile" name="automobile" className="form-select" value={automobile} >
                                <option value="">Choose an Automobile Vin</option>
                                {autos.map(auto => {
                                    return (
                                        <option key={auto.id} value={auto.vin}>
                                            {auto.vin}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select required onChange={salespersonChange} id="salesperson" name="salesperson" className="form-select" value={salesperson}>
                                <option value="">Choose a Salesperson</option>
                                {salespersons.map(salesperson => {
                                    return (
                                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                            {salesperson.first_name} {salesperson.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <select required onChange={customerChange} id="customer" name="customer" className="form-select" value={customer}>
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.first_name + customer.last_name} value={customer.phone_number}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3 mt-3" >
                            <input onChange={priceChange} placeholder="price" required type="text" name="price" id="price" className="form-control" value={price} />
                            <label>Price</label>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
