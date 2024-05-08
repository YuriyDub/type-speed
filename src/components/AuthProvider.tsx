import { ReactNode, createContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { auth } from "../firebase";
import { User } from "firebase/auth";

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({} as User);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser == null) {
        redirect("/login");
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
