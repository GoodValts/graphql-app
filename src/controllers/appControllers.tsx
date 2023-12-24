import React, { useState, ReactNode, useMemo, createContext } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthContextType {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({
  lang: localStorage.getItem('lang') || 'en',
  setLang: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  const value = useMemo(() => {
    return {
      lang,
      setLang,
    };
  }, [lang]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
