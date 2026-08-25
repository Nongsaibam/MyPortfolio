import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin_auth") === "true";
  });

  const login = (username, password) => {
    if (username === "Tazkhan@" && password === "Taz60099#") {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message:
        "🤨 Whoops! Username and password are having trust issues.",
    };
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
};