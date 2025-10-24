import { createContext } from "react";

export interface User {
  email: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (email: string, password: string, confirmPassword: string) => { success: boolean; error?: string };
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
