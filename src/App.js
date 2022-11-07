
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Admin from './components/pages/Admin'
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Users from './components/pages/Users';
import Tickets from './components/pages/Tickets';

function App() {

  const [currentUser,setCurrentUser] = useState([]);
  const [user,setUser] = useState(false)
  

  const RequireAuth = ({children}) =>{
    return user ? children : <Navigate to='/LoginPage'/>
  }
  return (

<div className='App'>
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
  <Route path="/Projects" element={<RequireAuth><Projects /></RequireAuth>} />
  <Route path="/Tickets" element={<RequireAuth><Tickets /></RequireAuth>} />
  <Route path="/LoginPage" element={<LoginPage setUser={setUser}/>} />
  <Route path="/Users" element={<RequireAuth><Users /></RequireAuth>} />
  <Route path="/Admin" element={<RequireAuth><Admin /></RequireAuth>}>
  </Route>
</Routes>
</BrowserRouter>
</div>

  )
}

export default App;
