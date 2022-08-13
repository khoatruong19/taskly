import React, { createContext, useContext, useState } from 'react';
import { User } from '../generated/graphql';
import JWTManager from '../utils/jwt';

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuth: () => Promise<void>;
  logoutClient: () => void;
}

const defaultIsAuthenticated = false;

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: defaultIsAuthenticated,
  setIsAuthenticated: () => {},
  checkAuth: () => Promise.resolve(),
  logoutClient: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultIsAuthenticated
  );

  const checkAuth = async () => {
    const token = JWTManager.getToken();
    if (token) setIsAuthenticated(true);
    else {
      const success = await JWTManager.getRefreshToken();
      if (success) setIsAuthenticated(true);
    }
  };

  const logoutClient = () => {
    JWTManager.deleteToken();
    setIsAuthenticated(false);
  };

  const authContextData: IAuthContext = {
    isAuthenticated,
    setIsAuthenticated,
    checkAuth,
    logoutClient,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
