import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import ModelForm from './ModelForm';
import SalespeopleList from './SalespeopleList';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import SalesForm from './SalesForm';
import SalesList from './SalesList';

function App(props) {

  // if (props.autos === undefined) {
  //   return null;
  // }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models/create" element={<ModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/create" element={<AutomobileForm />} />
          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/salespeople/create" element={<SalespersonForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<CustomerForm />} />
          <Route path="/sales/create" element={<SalesForm />} />
          <Route path="/sales" element={<SalesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
