import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import React from "react";
import Routes from "../routes";
import AuthContext from "../../authContext";


test('full app rendering/navigating', () => {
    const history = createMemoryHistory()
    const { getByRole } = render(
        <Router history={history}>
            <Routes />
        </Router>
    )
    expect(getByRole('heading')).toHaveTextContent('Welcome to our solution')
})

test('landing on a bad page shows 404 page', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
    const { getByRole } = render(
        <Router history={history}>
            <Routes />
        </Router>
    )
    expect(getByRole('heading')).toHaveTextContent('404 Not Found')
})

test('rendering a component that uses withRouter', () => {
    const history = createMemoryHistory()
    const route = '/home'
    history.push(route)
    const {getByRole} = render(
        <AuthContext.Provider value={{ authenticated: true, setAuthenticated: (boolVal:boolean) => {} }} >
            <Router history={history}>
                <Routes />
            </Router>
        </AuthContext.Provider>
    )
    expect(getByRole('heading')).toHaveTextContent('Successfully logged in')
})
