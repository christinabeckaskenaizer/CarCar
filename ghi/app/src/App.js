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
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import ServiceAppointment from './ServiceAppointment';
import ServiceAppointmentList from './ServiceAppointmentList';
import ServiceHistory from './ServiceHistory';
import SalesForm from './SalesForm';
import SalesList from './SalesList';
import ModelList from './ModelList';
import SalesPersonHistory from './SalesPersonHistory';



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
          <Route path="manufacturers" element={<ManufacturersList manufacturer={props.manufacturer} />} />
          <Route path="manufacturers/create" element={<CreateManufacturer />} />
          <Route path="/models/create" element={<ModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/create" element={<AutomobileForm />} />
          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/salespeople/create" element={<SalespersonForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<CustomerForm />} />
          <Route path="/technicians/create" element={<TechnicianForm />} />
          <Route path="/technicians" element={<TechnicianList Techmodels={Techmodels} />} />
          <Route path="/appointments/create" element={<ServiceAppointment Techmodels={Techmodels} />} />
          <Route path="/appointments" element={<ServiceAppointmentList />} />
          <Route path="/service_history" element={<ServiceHistory />} />

          <Route path="/sales/create" element={<SalesForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/sales/history" element={<SalesPersonHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
