import './App.css';

import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
