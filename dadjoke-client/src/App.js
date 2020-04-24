import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';

import Login from "./components/LoginForm.js";
import Register from "./components/RegisterForm.js";
import JokeList from "./components/JokeList.js";
import PrivateRoute from "./components/PrivateRoute.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/protected" component={JokeList} />
          <Route path="/register" component={Register} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
