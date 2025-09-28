import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

// Create the context object
const AuthContext = createContext(null);

// The provider component that will wrap your entire application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true); // --- FIX: Add loading state ---

  // This effect runs once on mount to initialize the auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Finished initial check
  }, []);

  // This effect listens for storage changes from OTHER tabs to sync state
  const handleStorageChange = useCallback((event) => {
    if (event.key === "token") {
      setToken(event.newValue);
    }
    if (event.key === "user") {
      setUser(event.newValue ? JSON.parse(event.newValue) : null);
    }
    if (event.key === null) {
      // This happens when localStorage.clear() is called on logout
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  const login = (userData, userToken) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    // Use clear to ensure the 'storage' event fires reliably for all keys
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading, // Provide the loading state to consumers
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for easy consumption of the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error will be thrown if useAuth is used outside of the provider
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
