import { createContext, useState } from 'react';
import {
  deviceDeleteAuthToken,
  deviceGetStoredAuthToken,
  deviceStoreAuthToken,
} from '../utils/deviceStorage';

export const AuthContext = createContext({
  authToken: '',
  checkIsAuthenticated: async () => {},
  deleteAuthToken: () => {},
  isAuthenticated: false,
  storeAuthToken: ({ token }) => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  const storeAuthToken = ({ token }) => {
    setAuthToken(token);
    deviceStoreAuthToken({ token });
  };

  const deleteAuthToken = () => {
    setAuthToken(null);
    deviceDeleteAuthToken();
  };

  async function checkIsAuthenticated() {
    const storedToken = await deviceGetStoredAuthToken();
    setAuthToken(storedToken);
  }

  const contextValue = {
    deleteAuthToken,
    isAuthenticated: !!authToken,
    storeAuthToken,
    checkIsAuthenticated,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
