import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import CreateManufacturer from './CreateManufacturer';


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
          <Route path="manufacturer" element={<ManufacturersList manufacturer={props.manufacturer} />} />
          <Route path="manufacturer/new" element={<CreateManufacturer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
