import React, { useEffect, useState } from 'react';

function TechnicianForm(props) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    // first create an empty data object, and then assign state values to the key names that the back end server is expecting
    const data = {};
    data.first_name = first_name;
    data.last_name = last_name;
    data.employee_id = employee_id

    const technicianUrl = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(technicianUrl, fetchConfig);
    // to clear the form: need to set the state to empty strings and use those values for the form elements
    if (response.ok) {
      const newTech = await response.json();

      setFirstName('');
      setLastName('');
      setEmployeeID('')
    }

  }
  // react hooks, change things in jsx after creating this

  // states is calling all of the states and state is referring to singular but you have to address both for it to work

  const [first_name, setFirstName] = useState('');
  const handleFirstNameChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setFirstName(value);
  }

  const [last_name, setLastName] = useState('');
  const handleLastNameChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setLastName(value);
  }

  const [employee_id, setEmployeeID] = useState('');
  const handleIDChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setEmployeeID(value);
  }


  // const [states, setStates] = useState([]); gets all of the states
  const fetchData = async () => {
    // how to get actual data for states to show up
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmployeeID(data.employee_id);

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
          <h1>Create a new Technician</h1>
          <form onSubmit={handleSubmit} id="create-tech-form">
            <div className="form-floating mb-3">
              {/* onChange updates the component state */}
              {/* add || to name for it to be a "controlled input or else an error will occur in console" */}
              <div>
                <input value={first_name || ''} onChange={handleFirstNameChange} placeholder="First Name..." required type="text" name="firstname" id="firstname" className="form-control" />
              </div>
              <div>
                <input value={last_name || ''} onChange={handleLastNameChange} placeholder="Last Name..." required type="text" name="lastname" id="lastname" className="form-control" />
              </div>
              <div>
                <input value={employee_id || ''} onChange={handleIDChange} placeholder="Employee ID..." required type="text" name="employee_id" id="employee_id" className="form-control" />
              </div>
            </div>
            <button className="btn btn-primary">Create Technician</button>
          </form>
        </div>
      </div>
    </div>
  );
}



export default TechnicianForm;

// name || '' means its a fallback value of setName('')
