"use client";
import { createContext, useContext, type ReactNode } from "react";

interface AuthContextValue {
  user: null;
  isLoading: boolean;
  isConfigured: boolean;
  supabase: null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: () => Promise<{ error: string | null }>;
  signUpWithEmail: () => Promise<{ error: string | null; confirmationRequired: boolean }>;
  signOut: () => Promise<void>;
  recordActivity: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const value: AuthContextValue = {
    user: null,
    isLoading: false,
    isConfigured: false,
    supabase: null,
    signInWithGoogle: async () => {},
    signInWithEmail: async () => ({ error: "Supabase is disconnected." }),
    signUpWithEmail: async () => ({ error: "Supabase is disconnected.", confirmationRequired: false }),
    signOut: async () => {},
    recordActivity: () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
