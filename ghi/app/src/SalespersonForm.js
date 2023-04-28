import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SalespersonForm() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const navigate = useNavigate();

    function firstNameChange(event) {
        const value = event.target.value;
        setFirstName(value);
    }

    function lastNameChange(event) {
        const value = event.target.value;
        setLastName(value);
    }

    function employeeIdChange(event) {
        const value = event.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const employeeUrl = "http://localhost:8090/api/salespeople/";
        const employeeResponse = await fetch(employeeUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })


        if (employeeResponse.ok) {
            const newEmployee = await employeeResponse.json();
            setFirstName('');
            setLastName('');
            setEmployeeId('');

            alert("Salesperson created!");

            navigate('/salespeople');
        } else {
            alert("Unable to create salesperson!");
        }

    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a salesperson</h1>
                    <form onSubmit={handleSubmit} id="add-a-salesperson-form">
                        <div className="form-floating mb-3">
                            <input onChange={firstNameChange} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" value={firstName} />
                            <label>First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={lastNameChange} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" value={lastName} />
                            <label>Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={employeeIdChange} placeholder="employee id" required type="text" name="employee_id" id="employee_id" className="form-control" value={employeeId} />
                            <label>Employee Id</label>
                        </div>
                        <button>Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
