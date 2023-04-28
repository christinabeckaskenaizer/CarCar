import React, { useEffect, useState } from "react";
import "./index.css"

function ModelList(props) {
  // if (!props.models) {
  //     return <div>loading...</div>
  // }


  const [models, setModels] = useState([])


  async function fetchModelsList() {
    const Modelsresponse = await fetch('http://localhost:8100/api/models/')

    if (Modelsresponse.ok) {

      const ModelsData = await Modelsresponse.json();
      setModels(ModelsData.models)
    }

  }

  useEffect(() => {
    fetchModelsList()
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>
        {models.map(model => {
          return (
            <tr key={model.id}>
              <td>{model.name}</td>
              <td>{model.manufacturer.name}</td>
              <td> <img className="Picture" src={model.picture_url} alt="Picture" /> </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ModelList;
