import React, {FunctionComponent, useContext} from 'react';
import AuthContext from "../authContext";
import {Redirect, Route, Switch} from "react-router-dom";
import AppScreen from "../appScreen/AppScreen";
import LoginScreen from "../loginScreen/loginScreen";

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

const NoMatch = () => <h1>404 Not Found</h1>

const Routes = () => (
    <Switch>
        <PrivateRoute path="/home">
            <AppScreen />
        </PrivateRoute>
        <Route exact path="/">
            <LoginScreen />
        </Route>
        <Route component={NoMatch} />
    </Switch>
)

export default Routes;