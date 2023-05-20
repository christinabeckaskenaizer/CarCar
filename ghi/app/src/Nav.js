import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <a> Inventory &#x25BE;</a>
              <ul className='dropdown'>
                <li><a href="/manufacturers/create">Create a Manufacturer</a></li>
                <li><a>to=</a>Manufacturers</li>
                <li><a>to=</a>Create a Model</li>
                <li><a>to=</a>Models</li>
                <li><a>to=</a>Create an Automobile</li>
                <li><a>to=</a>Automobiles</li>
              </ul>
            </li>
            {/* <li className="nav-item"> */}
            {/* <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
            {/* </li> */}
            {/* <NavLink className="nav-link" to="/manufacturers/create"> Create a Manufacturer</NavLink> */}
            <NavLink className="nav-link" to="/technicians/create"> Add a Technician</NavLink>
            <NavLink className="nav-link" to="/technicians"> Technicians</NavLink>
            <NavLink className="nav-link" to="/appointments/create"> Create a Service Appointment</NavLink>
            <NavLink className="nav-link" to="/appointments"> Service Appointments</NavLink>
            <NavLink className="nav-link" to="/service_history"> Service History</NavLink>
            {/* <NavLink className="nav-link" to="/models"> Models</NavLink>
            <NavLink className="nav-link" to='/models/create'>Create a Model</NavLink> */}
            <NavLink className="nav-link" to='/automobiles'>Automobiles</NavLink>
            <NavLink className="nav-link" to='/automobiles/create'>Create an Automobile</NavLink>
            <NavLink className="nav-link" to="/salespeople">Salespeople</NavLink>
            <NavLink className="nav-link" to='salespeople/create'>Add a Salesperson</NavLink>
            <NavLink className="nav-link" to='/customers/create'>Add a Customer</NavLink>
            <NavLink className="nav-link" to='/customers'>Customers</NavLink>
            <NavLink className="nav-link" to='/sales/create'>Add a Sale</NavLink>
            <NavLink className="nav-link" to='/sales'>Sales</NavLink>
            {/* <li> */}
            <NavLink className="nav-link" to='/sales/history'>Salesperson History</NavLink>
          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Nav;
