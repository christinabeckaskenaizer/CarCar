import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AutomobileForm(props) {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);

  const navigate = useNavigate();

  function colorChange(event) {
    const value = event.target.value;
    setColor(value);
  }

  function yearChange(event) {
    const value = event.target.value;
    setYear(value);
  }

  function vinChange(event) {
    const value = event.target.value;
    setVin(value);
  }

  function modelChange(event) {
    const value = event.target.value;
    setModel(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model;




    const automobileUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const automobileResponse = await fetch(automobileUrl, fetchConfig)
    if (automobileResponse.ok) {
      const newModel = await automobileResponse.json();

      setColor('');
      setYear('');
      setVin('');
      setModels([]);

      alert("Automobile added!");

      navigate('/automobiles');

    } else {
      alert("Unable to create autombile!");
    }
  }


  const fetchData = async () => {
    const modelUrl = 'http://localhost:8100/api/models/';
    const response = await fetch(modelUrl);

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-model-form">
            <div className="form-floating mb-3">
              <input onChange={colorChange} placeholder="color" required type="text" name="color" id="color" className="form-control" value={color} />
              <label htmlFor="name">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={yearChange} placeholder="year" required type="text" name="year" id="year" className="form-control" value={year} />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={vinChange} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" value={vin} />
              <label htmlFor="picture_url">VIN</label>
            </div>
            <div className="mb-3">
              <select required onChange={modelChange} id="model" name="model" className="form-select" value={model}>
                <option value="">Choose a model</option>
                {models.map(model => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
