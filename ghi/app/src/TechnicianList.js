import React, { useEffect, useState } from "react";

function TechnicianList({ Techmodels }) {
  const [techs, settechs] = useState([]);

  const fetchTechs = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      settechs(data.technicians);
    }
  }

  useEffect(() => {
    fetchTechs();
  }, []);




  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {techs.map((tech) => (

          <tr key={tech.id}>
            <td>{tech.employee_id}</td>
            <td>{tech.first_name}</td>
            <td>{tech.last_name}</td>

          </tr>


        ))}
      </tbody>
    </table>
  );
}

export default TechnicianList;
