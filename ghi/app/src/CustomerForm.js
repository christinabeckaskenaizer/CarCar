import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerForm() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    function firstNameChange(event) {
        const value = event.target.value;
        setFirstName(value);
    }

    function lastNameChange(event) {
        const value = event.target.value;
        setLastName(value);
    }

    function addressChange(event) {
        const value = event.target.value;
        setAddress(value);
    }

    function phoneNumberChange(event) {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //create data object
        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        //url to POST to
        const customersUrl = "http://localhost:8090/api/customers/"
        const fetchConfig = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        const customerResponse = await fetch(customersUrl, fetchConfig);
        if (customerResponse.ok) {
            const newCustomer = await customerResponse.json();

            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');

            alert("Customer created!");

            navigate('/customers');

        } else {
            alert("Unable to create Customer!");
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a customer</h1>
                    <form onSubmit={handleSubmit} id="add-customer-form">
                        <div className="form-floating mb-3">
                            <input onChange={firstNameChange} placeholder="first Name" required type="text" name="first_name" id="first_name" className="form-control" value={firstName} />
                            <label>First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={lastNameChange} placeholder="last Name" required type="text" name="last_name" id="last_name" className="form-control" value={lastName} />
                            <label>Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={addressChange} placeholder="address" required type="text" name="address" id="address" className="form-control" value={address} />
                            <label>Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={phoneNumberChange} placeholder="phone number" required type="text" name="phone_number" id="phone_number" className="form-control" value={phoneNumber} />
                            <label>Phone Number</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
