import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [ready, setReady] = useState(false); 

  useEffect(() => {
    const stored = sessionStorage.getItem("wed-auth");
    if (stored === "yes") setIsAuthed(true);
    setReady(true);
  }, []);

  const login = (pw) => {
    if (pw === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
      sessionStorage.setItem("wed-auth", "yes");
      setIsAuthed(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthed, login, ready }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
