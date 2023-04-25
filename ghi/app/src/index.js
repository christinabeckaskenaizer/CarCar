import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// async function LoadAutomobiles() {
//   const automobileResponse = await fetch("http://localhost:8100/api/automobiles/");

//   if (automobileResponse.ok) {
//     const automobileData = await automobileResponse.json();
//     root.render(
//       <React.StrictMode>
//         <App autos={automobileData} />
//       </React.StrictMode>
//     );
//   } else {
//     console.error(automobileResponse);
//   }
// }

// LoadAutomobiles();
