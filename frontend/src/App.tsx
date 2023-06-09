
import { BrowserRouter } from 'react-router-dom';
import './global.css'
import { RouterApp } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function App() {


  return (
    <BrowserRouter>
    <ToastContainer/>
    <AuthProvider>
     <RouterApp/>
     </AuthProvider>
     </BrowserRouter>
 
  );
}


