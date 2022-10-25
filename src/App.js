import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Tickets from './components/pages/Tickets'
import Admin from './components/pages/Admin'
import { LoginPage } from 'tabler-react';

function App() {
  return (

    <div className='App' >
          <Router>
<Navbar/>
<Switch>
<Route exact path='/'>
  <Dashboard/>
</Route>
<Route path='/Projects'>
  <Projects/>
</Route>
<Route path='/Tickets'>
  <Tickets/>
</Route>
<Route path='/Admin'>
  <Admin/>
</Route>
<Route path='/LoginPage'>
  <LoginPage/>
</Route>
</Switch>
</Router>
    </div>



    
  );
}

export default App;
