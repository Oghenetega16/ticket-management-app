import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem("ticketapp_session");
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    setLoading(true);
    if (email === "demo@user.com" && password === "password123") {
      const userData = { email, name: "Demo User" };
      setUser(userData);
      localStorage.setItem("ticketapp_session", JSON.stringify(userData));
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: "Invalid credentials" };
    }
  };

  const signup = (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }
    const newUser = { email, name: email.split("@")[0] };
    setUser(newUser);
    localStorage.setItem("ticketapp_session", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ticketapp_session");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
