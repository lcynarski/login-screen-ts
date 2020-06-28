import React, {createContext} from 'react';

const AuthContext = createContext({
    authenticated: false,
    setAuthenticated: (state : boolean) => {}
});

export default AuthContext;