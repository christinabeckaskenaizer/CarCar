import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import ModelForm from './ModelForm';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models/create" element={<ModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/create" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
