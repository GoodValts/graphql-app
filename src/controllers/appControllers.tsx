import React, { useState, ReactNode, useMemo, createContext } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthContextType {
  isAuth: boolean;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  lang: localStorage.getItem('lang') || 'en',
  setLang: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  const value = useMemo(() => {
    return {
      isAuth,
      setAuth,
      lang,
      setLang,
    };
  }, [isAuth, lang]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
