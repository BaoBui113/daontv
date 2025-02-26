"use client";
import Cookies from "js-cookie";
import React, { createContext, ReactNode, useContext, useState } from "react";
type IProfile = {
  token: string;
};
interface AuthContextType {
  user: IProfile | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define type for AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IProfile | null>(null);

  const login = (token: string) => {
    try {
      Cookies.set("movie_token", token, {
        expires: 1 / 24,
      });
      setUser({ token });
    } catch (error) {
      console.error("Login failed: invalid auth", error);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("movie_token");
  };

  React.useEffect(() => {
    const storedToken = Cookies.get("movie_token");
    if (storedToken) {
      setUser({ token: storedToken });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
