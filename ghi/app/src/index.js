import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadInventoryList() {
  const Manufacturerresponse = await fetch('http://localhost:8100/api/manufacturers/');

  if (Manufacturerresponse.ok) {
    const ManufacturerData = await Manufacturerresponse.json();

    root.render(
      <React.StrictMode>
        <App manufacturer={ManufacturerData.manufacturers} />
      </React.StrictMode>
    );


  } else {
    console.error('dis not working');
  }
}
loadInventoryList();
