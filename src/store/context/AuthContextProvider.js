import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import ExpenseContext from "./expense-context";


const AuthContextProvider = (props) => {
  const intialToken = localStorage.getItem('user');
  const intialUserEmail = localStorage.getItem('userEmail');
  const [token, setToken] = useState(intialToken);
  const [userEmail, setUserEmail] = useState(intialUserEmail);

  

  const expCtx = useContext(ExpenseContext);

    // if (token == null && localStorage.length !== 0) {
    //   setToken(localStorage["user"]);
    //   setUserEmail(localStorage['userEmail'])
    // }
  const userLoggedIn = !!token;

  const loginHandler = (tokenId, email) => {
    setToken(tokenId);
    setUserEmail(email);
    expCtx.onLogin();
    localStorage.setItem('user', tokenId);
    localStorage.setItem('userEmail', email);
    
  };

  const logoutHandler = () => {
    setToken(null);
    setUserEmail(null);
    expCtx.items = [];
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
  };

  setTimeout(() => {
    logoutHandler();
  }, 5*60000);
  

  const authContext = {
    token: token,
    isLoggedIn: userLoggedIn,
    userEmail: userEmail, 
    login: loginHandler,
    logout: logoutHandler,
  };
  

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;