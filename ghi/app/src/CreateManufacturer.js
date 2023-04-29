import React, { useEffect, useState } from 'react';

function CreateManufacturer(props) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    // first create an empty data object, and then assign state values to the key names that the back end server is expecting
    const data = {};
    data.name = name;


    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(manufacturerUrl, fetchConfig);
    // to clear the form: need to set the state to empty strings and use those values for the form elements
    if (response.ok) {
      const newManufacturer = await response.json();

      setName('');
      alert("Manufacturer created!");

    }

  }
  // react hooks, change things in jsx after creating this

  // states is calling all of the states and state is referring to singular but you have to address both for it to work

  const [name, setName] = useState('');
  const handleNameChange = (event) => {
    // event.target.value property is the text that the user typed into the form."
    const value = event.target.value;
    setName(value);
  }

  // const [states, setStates] = useState([]); gets all of the states
  const fetchData = async () => {
    // how to get actual data for states to show up
    const url = 'http://localhost:8100/api/manufacturers/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setName(data.manfacturers)
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
          <h1>Create a new Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              {/* onChange updates the component state */}
              {/* add || to name for it to be a "controlled input or else an error will occur in console" */}
              <input value={name || ''} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label>Manufacturer Name...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}



export default CreateManufacturer;

// name || '' means its a fallback value of setName('')
