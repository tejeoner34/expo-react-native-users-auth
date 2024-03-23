import { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  storeAuthToken: ({ token }) => {},
  authToken: '',
  deleteAuthToken: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(false);

  const storeAuthToken = ({ token }) => {
    setAuthToken(token);
  };

  const deleteAuthToken = () => {
    setAuthToken('');
  };

  const contextValue = {
    storeAuthToken,
    isAuthenticated: !!authToken,
    deleteAuthToken,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
