import React from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    userEmail: '',
    login: (token) => {},
    logout: () => {}    
});

export default AuthContext;