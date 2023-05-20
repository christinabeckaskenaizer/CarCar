import { useState, useEffect } from "react";

const ServiceAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAppointments = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
      setFiltered(data.appointments);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchResult = appointments.filter(
      (appointment) => appointment.vin === searchTerm
    );
    setFiltered(searchResult);
    setSearchTerm("");
  };

  return (
    <>
      <div className="px-4 py-5 my-1 mt-0 text-center">
        <h1 className="display-5">Service Appointments</h1>
        <form onSubmit={handleSearch}>
          <label>
            {/* <input
              type="text"
              class="form-control"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            /> */}
            <div className="row mb-3">
              <label htmlFor="inputEmail3" value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} className="col-sm-2 col-form-label">VIN</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" />
              </div>
            </div>
          </label>
          <button onClick={handleSearch} type="button" className="button btn btn-success btn-sm text-center" >Search</button>
        </form>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Is Vip?</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((appointment) => {
            if (!appointment.finished) {
              return (
                <tr className="table-row" key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{appointment.customer}</td>
                  <td>
                    {new Date(appointment.date_time).toLocaleDateString(
                      "en-US"
                    )}
                  </td>
                  <td>
                    {new Date(appointment.date_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{appointment.technician.first_name}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.vip ? "Yes" : "No"}</td>
                  <td>{appointment.status ? "Canceled" : "Finished"}</td>
                  <td></td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};

export default ServiceAppointmentList;
