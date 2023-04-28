import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import MainPage from './MainPage';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import ModelForm from './ModelForm';
import SalespeopleList from './SalespeopleList';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import CreateManufacturer from './CreateManufacturer';
import SalespersonForm from './SalespersonForm';
import VehicleList from './VehicleList';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import ServiceAppointment from './ServiceAppointment';
import ServiceAppointmentList from './ServiceAppointmentList';
import ServiceHistory from './ServiceHistory';



function App(props) {

  // moved to higher level so two pages can use it at the same time instead of fetching more
  const [Techmodels, setTech] = useState([])


  async function fetchTechsList() {
      const Techresponse = await fetch('http://localhost:8080/api/technicians/')

      if (Techresponse.ok) {

          const TechData = await Techresponse.json();
          setTech(TechData.technicians)
      }

  }

  useEffect(() => {
    fetchTechsList()
}, []);


if (props.manufacturer === undefined) {
  return null;
}

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturer" element={<ManufacturersList manufacturer={props.manufacturer} />} />
          <Route path="manufacturer/new" element={<CreateManufacturer />} />
          <Route path="/models/create" element={<ModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/create" element={<AutomobileForm />} />
          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/salespeople/create" element={<SalespersonForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<CustomerForm />} />
          <Route path="/models" element={<VehicleList />} />
          <Route path="/technicians/create" element={<TechnicianForm />} />
          <Route path="/technicians" element={<TechnicianList Techmodels={Techmodels} />} />
          <Route path="/appointments/create" element={<ServiceAppointment Techmodels={Techmodels} />} />
          <Route path="/appointments" element={<ServiceAppointmentList />} />
          <Route path="/service_history" element={<ServiceHistory />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
