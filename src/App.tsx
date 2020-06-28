import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoginScreen from "./loginScreen/loginScreen";
import AppScreen from "./appScreen/AppScreen";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/home">
                  <AppScreen />
              </Route>
              <Route path="/">
                  <LoginScreen />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
