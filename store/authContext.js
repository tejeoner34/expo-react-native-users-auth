import { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  authenticate: ({ token }) => {},
  authToken: '',
  logOut: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(false);

  const authenticate = ({ token }) => {
    setAuthToken(token);
  };

  const logOut = () => {
    setAuthToken('');
  };

  const contextValue = {
    authenticate,
    isAuthenticated: !!authToken,
    logOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
