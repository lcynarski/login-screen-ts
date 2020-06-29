import React, {useState} from 'react';
import {
    HashRouter as Router
} from "react-router-dom";
import AuthContext from "./authContext";
import Routes from "./routing/routes";


function App() {
    const [authenticated, setAuthenticated] = useState(false);

    return (
      <Router>
          <AuthContext.Provider value={{authenticated, setAuthenticated}} >
              <Routes />
          </AuthContext.Provider>
      </Router>
    );
}

export default App;
