import React, { useEffect, useState } from "react";

function ManufacturerList(props) {

  const [manufacturers, setManufacturers] = useState([])

  async function getManufacturers() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url, { method: "get" });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setManufacturers(data.manufacturers);
    }

  }

  useEffect(() => {
    getManufacturers();
  }, [])

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Manufacturers</th>
        </tr>
      </thead>
      <tbody>
        {manufacturers.map(manufacturer => {
          return (
            <tr key={manufacturer.id}>
              <td>{manufacturer.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ManufacturerList;
