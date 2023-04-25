import React from "react";
import { useState, useEffect } from "react";

export default function ModelForm() {

    const [modelName, setModelName] = useState("");
    const [picture, setPicture] = useState("");
    const [manufacturer, setManufacturer] = useState(false);
    const [manufacturers, setManufacturers] = useState([]);

    function modelNameChange(event) {
        const value = event.target.value;
        setModelName(value);
    }

    function pictureChange(event) {
        const value = event.target.value;
        setPicture(value);
    }

    function manufacturerChange(event) {
        const value = event.target.value;
        setManufacturer(value);
    }

    function manufacturersChange(event) {
        const value = event.target.value;
        setManufacturers(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = modelName;
        data.picture_url = picture;
        data.manufacturer_id = manufacturer;

        console.log(data)

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const modelResponse = await fetch(modelUrl, fetchConfig)
        if (modelResponse.ok) {
            const newModel = await modelResponse.json();
            console.log(newModel);

            setModelName('');
            setPicture('');
            setManufacturers([]);
        }
    }
    const fetchData = async () => {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(manufacturerUrl);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a vehicle model </h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={modelNameChange} placeholder="Model name" required type="text" name="name" id="name" className="form-control" value={modelName} />
                            <label htmlFor="name">Model name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={pictureChange} placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control" value={picture} />
                            <label htmlFor="picture_url">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select required onChange={manufacturerChange} id="manufacturer" name="manufacturer" className="form-select" value={manufacturer}>
                                <option value="">Choose a manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
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
