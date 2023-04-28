import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import SalesForm from './SalesForm';
import SalesList from './SalesList';
import ModelList from './ModelList';
import SalesPersonHistory from './SalesPersonHistory';



function App(props) {
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
