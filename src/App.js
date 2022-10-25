
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Admin from './components/pages/Admin'
import LoginPage from './components/pages/LoginPage';
import Tickets from './components/pages/Tickets';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

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
  <Route path="/LoginPage" element={<LoginPage setUser={setUser}/>} />
  <Route path="/Tickets" element={<RequireAuth><Tickets /></RequireAuth>} />
  <Route path="/Admin" element={<RequireAuth><Admin /></RequireAuth>}>
  </Route>
</Routes>
</BrowserRouter>
</div>








    
  )
}

export default App;
