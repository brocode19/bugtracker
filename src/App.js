import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Admin from './components/pages/Admin'
import LoginPage from './components/pages/LoginPage';
import Tickets from './components/pages/Tickets';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (

<div className='App'>
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/Projects" element={<Projects />} />
  <Route path="/LoginPage" element={<LoginPage />} />
  <Route path="/Tickets" element={<Tickets />} />
  <Route path="/Admin" element={<Admin />}>
  </Route>
</Routes>
</BrowserRouter>
</div>








    
  )
}

export default App;
