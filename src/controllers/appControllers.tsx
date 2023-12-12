import React, { useState, ReactNode, useMemo, createContext } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthContextType {
  isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const value = useMemo(() => {
    return {
      isAuth,
      setAuth,
    };
  }, [isAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
