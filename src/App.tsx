import React, {FunctionComponent, useContext, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AuthContext from "./authContext";
import LoginScreen from "./loginScreen/loginScreen";
import AppScreen from "./appScreen/AppScreen";

interface PrivateRouteProps {
    children: React.ReactNode,
    path: string
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children, path, ...rest }) => {
    const { authenticated } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}


function App() {
    const [authenticated, setAuthenticated] = useState(false);

    return (
      <Router>
          <AuthContext.Provider value={{authenticated, setAuthenticated}} >
              <Switch>
                  <PrivateRoute path="/home">
                      <AppScreen />
                  </PrivateRoute>
                  <Route path="/">
                      <LoginScreen />
                  </Route>
              </Switch>
          </AuthContext.Provider>
      </Router>
    );
}

export default App;
