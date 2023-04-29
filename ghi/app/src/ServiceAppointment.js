import React, { useEffect, useState } from 'react';

function ServiceAppointment({ Techmodels }) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    // first create an empty data object, and then assign state values to the key names that the back end server is expecting
    const data = {};
    data.vin = vin;
    data.customer = customer;
    data.date_time = date + ':00';
    data.technician = technician;
    data.reason = reason;

    const AppointmentUrl = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(AppointmentUrl, fetchConfig);
    // to clear the form: need to set the state to empty strings and use those values for the form elements
    if (response.ok) {
      const newAppointment = await response.json();

      setVin('');
      setCustomer('');
      setDate('');
      setTime('');
      setTechnician('');
      setReason('')

      alert("Service Appointment created!");

    }

  }
  // react hooks, change things in jsx after creating this

  // states is calling all of the states and state is referring to singular but you have to address both for it to work

  const [vin, setVin] = useState('');
  const handleVinChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setVin(value);
  }

  const [customer, setCustomer] = useState('');
  const handleCustomerChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setCustomer(value);
  }

  const [date, setDate] = useState('');
  const handleDateChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setDate(value);
  }
  const [time, setTime] = useState('');
  const handleTimeChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setTime(value);
  }
  const [technician, setTechnician] = useState('');
  const handleTechnicianChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setTechnician(value);
  }
  const [reason, setReason] = useState('');
  const handleReasonChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setReason(value);
  }

  // const [states, setStates] = useState([]); gets all of the states
  const fetchData = async () => {
    // how to get actual data for states to show up
    const url = 'http://localhost:8080/api/appointments/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setVin(data.vin);
      setCustomer(data.customer);
      setDate(data.date_time);
      setTime(date.date_time);
      setTechnician(data.technician);
      setReason(data.reason);

    }
  }
  //   react hooks
  useEffect(() => {
    fetchData();
  }, []);



  // JSX
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Service Appointment</h1>
          <form onSubmit={handleSubmit} id="create-service_appointment-form">
            <div className="form-floating mb-3">
              {/* onChange updates the component state */}
              {/* add || to name for it to be a "controlled input or else an error will occur in console" */}
              <div>
                <input value={vin || ''} onChange={handleVinChange} placeholder="Automobile Vin" required type="text" name="vin" id="vin" className="form-control" />
              </div>
              <div>
                <input value={customer || ''} onChange={handleCustomerChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
              </div>
              <div>
                <label>Date</label>
                <input value={date || ''} onChange={handleDateChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
              </div>
              <div>
                <label>Time</label>
                <input value={time || ''} onChange={handleTimeChange} placeholder='Time' required type="time" name='time' id='time' className="form-control" />
              </div>

              {/* dropdown menu for technician */}
              <div>
                <select
                  required
                  name="technician"
                  id="technician"
                  className="form-select"
                  onChange={handleTechnicianChange}
                  value={technician}
                >

                  <option value="">Choose a Technician</option>
                  {Techmodels.map((tech) => {
                    return (
                      <option
                        key={tech["id"]}
                        value={tech["href"]}
                      >
                        {tech.employee_id}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* --------------------------------- */}
              <div>
                <input value={reason || ''} onChange={handleReasonChange} placeholder='Reason' required type='text' name='reason' id='reason' className="form-control" />
              </div>
            </div>
            <button className="btn btn-primary">Create Technician</button>
          </form>
        </div>
      </div>
    </div>
  );
}



export default ServiceAppointment;

// name || '' means its a fallback value of setName('')
