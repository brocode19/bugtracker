import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Admin from './components/pages/Admin'
import LoginPage from './components/pages/LoginPage';
import Tickets from './components/pages/Tickets';

function App() {
  return (


<Router>
<Navbar/>
<div className='App'>
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
</div>
</Router>




    
  );
}

export default App;
