"use client";
import { createContext, useContext, useState } from "react";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// Mock user data
const mockUser = {
  id: "mock-user-id",
  email: "mock@example.com",
  role: "authenticated",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
} as User;

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Always return the mock user and set loading to false
  const [user] = useState<User | null>(mockUser);
  const [loading] = useState(false);

  const signOut = async () => {
    // Mock sign out - do nothing
    console.log("Sign out called (disabled)");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
