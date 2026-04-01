import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: check localStorage for saved login
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (email, password) => {
  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",                          // ✅ sends/receives the session cookie
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);        // bubble up server errors

  setUser({ id: data.userId, email });
  localStorage.setItem("user", JSON.stringify({ id: data.userId, email }));
};

// Add it to the Provider value


  return (
    <AuthContext.Provider value={{ user, login, logout, register }}></AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);