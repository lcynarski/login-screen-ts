import React from 'react';

const AuthContext = React.createContext({
    authenticated: false,
    setAuthenticated: (state : boolean) => {}
});

export default AuthContext;