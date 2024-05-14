import React, { useState, useEffect } from 'react';



const AuthContext = React.createContext({  // you created a context to control login and logout with objects bellow
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');  // here taht if you click logout button ( isLoggedIn ) will be removed from console
    setIsLoggedIn(false); // here if you clicked logout isloogedin object will be false so that you are not longer logged in
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1'); // here taht if you click logoin button ( isLoggedIn ) will be setted from console
    setIsLoggedIn(true);  // here if you clicked login isloogedin object will be true so that you are logged in
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
