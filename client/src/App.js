import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import JokesList from './components/JokesList';


import PrivateRoute from './components/PrivateRoute';


function App() {

 
  const Logout = () => {
    localStorage.removeItem('token');  
    //props.history.push("/login");     
  }
  const token = localStorage.getItem('token')
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
              <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/jokes">Jokes</Link>
          </li>
          <li>
            <Link to="/logout" onClick={() => Logout()}>Logout</Link>
          </li>
        </ul>
        <Switch>
                    
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/jokes" component={JokesList} />
          

          <Route component={Login} />
          
        </Switch> 
      </div>
    </Router>
  );
}

export default App;